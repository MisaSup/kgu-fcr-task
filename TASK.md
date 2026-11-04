# RE-02

Знакомимся с **Vite** — современным сборщиком и dev-сервером — и проходим официальный туториал React «Крестики-нолики».

До этого мы собирали проекты на esbuild и webpack, настраивая конфиги вручную. Vite делает то же самое «из коробки»: мгновенный dev-сервер с HMR и готовую production-сборку. А официальный туториал React даст практику работы с компонентами, пропсами и состоянием (`useState`).

## Что нужно сделать

1. Создать проект на Vite по шаблону **react-ts**. Команду для создания проекта найдите самостоятельно в официальном гайде — раздел [Scaffolding Your First Vite Project](https://vite.dev/guide/#scaffolding-your-first-vite-project).

2. Установить зависимости и запустить dev-сервер (тоже описано в гайде).

3. Очистить шаблон от стартового кода Vite: убрать логотипы, кнопку-счётчик, лишние стили и компонент-пример, оставив чистый каркас приложения.

4. Пройти официальный туториал React — [**«Tutorial: Tic-Tac-Toe»**](https://react.dev/learn/tutorial-tic-tac-toe) — и собрать игру «Крестики-нолики». Идём по шагам статьи: доска, пропсы, `useState`, ход по очереди, определение победителя и «путешествие во времени» (история ходов).

   > Туториал написан на JavaScript для CodeSandbox. Мы используем **TypeScript + Vite**, поэтому:
   > - файлы — `.tsx` (`App.tsx`), точка входа — `src/main.tsx`;
   > - стили из туториала (`styles.css`) подключаем в `src/`;
   > - по возможности типизируем пропсы и состояние.

5. Собрать production-версию и проверить её локально (команды сборки и предпросмотра — в гайде Vite).

## Требования к структуре

```text
tic-tac-toe/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    styles.css   (или App.css / *.module.css)
```

## Критерии готовности

- Проект создан через Vite по шаблону `react-ts`.
- Стартовый код Vite удалён — нет лишних логотипов, счётчика и демо-стилей.
- Игра «Крестики-нолики» полностью работает:
  - ходы по очереди `X` и `O`;
  - занятую клетку нельзя перезаписать;
  - показывается победитель или чей ход следующий;
  - есть история ходов с возможностью вернуться к любому ходу.
- Проект использует TypeScript (`.tsx`, типы для пропсов/состояния).
- Сборка и предпросмотр production-версии работают без ошибок.

## Работа с репозиторием

- PR нужно сделать в ветку `task/RE-02`.

Подробнее про то, как мы работаем с репозиториями, — в [README.md](README.md).

## Ресурсы

- [Презентации курса (Google Drive)](https://drive.google.com/drive/folders/1dQFBPJ4BL9fk2z7Z02mZG_nGh5jGCPN0?usp=sharing)
- [Vite: Getting Started](https://vite.dev/guide/)
- [Vite: Features](https://vite.dev/guide/features)
- [React: Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)
- [React: documentation](https://react.dev/)
- [React + TypeScript](https://react.dev/learn/typescript)
