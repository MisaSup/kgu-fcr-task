# RE-03

Приводим «Крестики-нолики» из предыдущего задания в порядок: раскладываем компоненты по отдельным файлам, переводим стили на **CSS-модули**, переверстаем доску на **grid**, выносим состояние в **Zustand** и добавляем расширенный режим игры на **Mantine**.

В предыдущем задании вы прошли официальный туториал React и собрали игру на Vite: весь код — в одном `App.tsx`, все стили — в одном `styles.css`, а состояние (`history`, `currentMove`) живёт в `useState` внутри `Game`. Так проект не масштабируется: в одном файле и клетка, и доска, и вся логика, классы вроде `.square` общие для всего приложения, а состояние не достать из другого компонента без прокидывания пропсов. Разнесём код по файлам, изолируем стили, переверстаем доску на grid, отдадим состояние отдельному стору и добавим настройки игры на готовых компонентах Mantine.

> **Лучше сначала выполнить предыдущее задание (RE-02).** Здесь мы рефакторим готовую игру из туториала React: если проекта ещё нет, переделывать будет нечего. Сначала пройдите [туториал «Крестики-нолики»](https://react.dev/learn/tutorial-tic-tac-toe) и соберите игру на Vite — а потом возвращайтесь к этому заданию.

## Что нужно сделать

1. Разложить компоненты по отдельным файлам — **один компонент на файл**:
   - `Square`, `Board`, `Game` — каждый в своём файле;
   - общие типы (`Player`, `SquareValue`, `Squares`), `calculateWinner` и расчёт статуса — в отдельные модули;
   - `App.tsx` остаётся точкой сборки: рендерит `Game` и больше ничего.

   Ориентир по структуре (можно свою, если правила выше выполнены):

   ```text
   src/
     main.tsx
     index.css
     App.tsx
     components/
       Game.tsx
       Game.module.css
       Board.tsx
       Board.module.css
       Square.tsx
       Square.module.css
       SettingsModal.tsx
     lib/
       types.ts
       calculateWinner.ts
       calculateStatus.ts
     store/
       gameStore.ts
   ```

2. Стили каждого компонента — в его собственном **CSS-модуле**:
   - `Game.module.css`, `Board.module.css`, `Square.module.css`;
   - глобальными остаются только базовые стили (`*`, `body`) — их можно держать в `index.css` и подключать в `main.tsx`;
   - классы берём из модуля: `className={styles.square}`, а не `className="square"`;
   - глобальных `.square`, `.board-row`, `.status`, `.game` больше нет — каждый класс живёт в модуле своего компонента.

   > Vite поддерживает CSS-модули из коробки: файл с именем `*.module.css` — это модуль, его default-export — объект с локализованными именами классов. Никаких настроек и плагинов не нужно.

3. Переверстать доску на **CSS grid** и рендерить клетки через `map`:
   - вместо трёх рядов `<div>` с классом `board-row` и захардкоженными `Square` — один контейнер-сетка и `squares.map(...)`;
   - класс `board-row` (и хак с `::after` / `clear: both`) удаляем: сетку задают `display: grid` и `grid-template-columns: repeat(3, …)`;
   - размер клетки определяет grid, а не `float` и отрицательные отступы — `.square` заполняет ячейку (`width` / `height: 100%`).

4. Перевести состояние игры на **Zustand** — по официальному туториалу [**«Tutorial: Tic-Tac-Toe»**](https://zustand.docs.pmnd.rs/learn/guides/tutorial-tic-tac-toe.html):
   - установить `zustand` и вынести `history` и `currentMove` из `Game` в отдельный store (`src/store/gameStore.ts`), созданный через `create` и `combine` из `zustand/middleware`;
   - менять состояние только через экшены стора, а не присваиванием полей;
   - `Game` читает данные через селекторы — `useGameStore((state) => state.history)` — и больше не хранит историю и текущий ход в `useState`;
   - типизировать и состояние, и экшены (в том числе сеттеры, принимающие значение или функцию-апдейтер);
   - в туториале появляется расчёт ходов и статус «ничья» — добавьте его: заполненная доска без победителя должна показывать ничью.

   > `Board` по-прежнему получает `xIsNext`, `squares` и `onPlay` пропсами — из стора читает только `Game`.

5. Добавить **расширенный режим игры** на **Mantine**:
   - подключить библиотеку по официальному гайду [Usage with Vite](https://mantine.dev/guides/vite/), но **пропустить шаг с PostCSS**: пакеты `postcss-preset-mantine` и `postcss-simple-vars` не ставим, файл `postcss.config.cjs` не создаём — стили компонентов у нас в CSS-модулях;
   - установить `@mantine/core`, `@mantine/hooks`, **`@mantine/form`** и **`zod`**, подключить `@mantine/core/styles.css` и обернуть приложение в `MantineProvider`;
   - форму настроек положить в **`Modal`** и открывать её кнопкой (`useDisclosure` из `@mantine/hooks`);
   - поля формы: имя игрока 1, имя игрока 2 и число раундов — только нечётное: 1, 3 или 5;
   - валидация — **zod-схемой** через `schemaResolver` из `@mantine/form` ([schema validation](https://mantine.dev/form/schema-validation/)): пустые имена и чётное число раундов должны давать ошибки под полями;
   - на узких экранах модалка открывается на весь экран — `useMediaQuery` из `@mantine/hooks` и проп `fullScreen` у `Modal`;
   - матч идёт до большинства побед (для 3 раундов — до 2): показываем счёт по раундам и номер раунда; после раунда — кнопка «следующий раунд», после матча — «новый матч»; ничья в раунде очков не приносит, раунд переигрывается;
   - интерфейс — на компонентах Mantine (`Button`, `TextInput`, `NumberInput`, `Modal`, `Stack`, `Group`, `Title`, `Text`), а не на самописных кнопках и панелях.

6. Сохранить поведение и типизацию из предыдущего задания: типы пропсов и состояния, ходы по очереди `X` и `O`, запрет перезаписи занятой клетки, определение победителя и ничьей, история ходов.

7. Проверить, что проект запускается (`npm run dev`) и собирается (`npm run build`).

## Критерии готовности

- Каждый компонент (`Square`, `Board`, `Game`, `SettingsModal`) лежит в своём файле, в одном файле — один компонент.
- Логика победы, статуса и общие типы вынесены из компонентов в отдельные модули.
- У компонентов со своими стилями есть `*.module.css`, и он импортируется только в этом компоненте; компоненту, собранному целиком на Mantine-пропсах (модалка), отдельный модуль не нужен.
- В JSX нет строковых `className` из старого `styles.css` — только `styles.*` (кроме базовых глобальных стилей).
- Доска — один grid-контейнер, клетки рендерятся через `squares.map(...)`; классов `board-row` и обёрток-рядов нет.
- `zustand` подключён как зависимость, состояние игры и его обновление живут в типизированном store.
- В `Game` нет `useState` для `history` и `currentMove` — они читаются из стора через селекторы.
- Mantine подключён без PostCSS: есть `MantineProvider` и `import '@mantine/core/styles.css'`, при этом нет `postcss.config.*` и postcss-плагинов в зависимостях.
- Форма настроек открывается кнопкой в `Modal`; поля — имена двух игроков и число раундов, валидация — zod-схема через `schemaResolver`; пустое имя и чётное число раундов дают ошибки под полями.
- Счёт ведётся по раундам, матч идёт до большинства побед (для 3 раундов — до 2); ничья в раунде очков не приносит и раунд переигрывается.
- `useMediaQuery` и `fullScreen` делают модалку полноэкранной на узких экранах.
- Игра работает как раньше:
  - ходы по очереди `X` и `O`;
  - занятую клетку нельзя перезаписать;
  - показывается победитель, ничья или чей ход следующий;
  - есть история ходов с возможностью вернуться к любому ходу.
- `npm run dev` и `npm run build` проходят без ошибок, TypeScript не ругается.

## Работа с репозиторием

- PR нужно сделать в ветку `task/RE-03`.

Подробнее про то, как мы работаем с репозиториями, — в [README.md](README.md).

## Ресурсы

- [Презентации курса (Google Drive)](https://drive.google.com/drive/folders/1dQFBPJ4BL9fk2z7Z02mZG_nGh5jGCPN0?usp=sharing)
- [React: Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) — туториал из предыдущего задания
- [Zustand: Tutorial: Tic-Tac-Toe](https://zustand.docs.pmnd.rs/learn/guides/tutorial-tic-tac-toe.html)
- [Zustand: Getting Started](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Mantine: Usage with Vite](https://mantine.dev/guides/vite/)
- [Mantine: useForm](https://mantine.dev/form/use-form/)
- [Mantine: Schema validation (zod)](https://mantine.dev/form/schema-validation/)
- [Mantine: Modal](https://mantine.dev/core/modal/)
- [Mantine: useMediaQuery](https://mantine.dev/hooks/use-media-query/)
- [Mantine: Core components](https://mantine.dev/core/button/)
- [zod: документация](https://zod.dev/)
- [React: Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
- [Vite: CSS Modules](https://vite.dev/guide/features#css-modules)
- [MDN: CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [React + TypeScript](https://react.dev/learn/typescript)
