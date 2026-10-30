# RE-01

Переводим приложение **«Показать мой IP»** на **React**.

Это то же задание, что и **RE-00**, только в качестве основы берём не анкету, а приложение из задания **CAT-01**. В ветке `task/CAT-01-demo` лежит готовый шаблон: TypeScript, кнопка **«Показать мой IP»** и область для результата.

До этого мы собирали интерфейс «по-реактовски» руками: компонент — это функция, которая возвращает строку с HTML. Теперь сделаем то же самое, но настоящим React: с JSX, компонентами и рендером в корневой элемент `#app`.

## Что нужно сделать

1. Создать свою ветку от `task/CAT-01-demo` и установить зависимости:

   ```bash
   npm install
   ```

2. Установить React и типы:

   ```bash
   npm install react react-dom
   npm install --save-dev @types/react @types/react-dom
   ```

3. Подключить JSX в `tsconfig.json` (`"jsx": "react-jsx"`) и разрешить `.tsx` в сборке.

4. Переписать компоненты из «функция → строка» в React-компоненты (`App`, `IpViewer`, `Spinner`) — теперь они возвращают JSX. Логику загрузки данных (`getIpApi`) и состояния интерфейса сохранить.

5. Отрендерить приложение в `#app` через `createRoot` из `react-dom/client` в `src/index.tsx`.

6. Перевести стили на **CSS-модули**: стили компонентов — в `*.module.css`, импортировать их прямо в компонентах. Отдельный `public/styles.css` больше не нужен — стили должны собираться в бандл (в webpack включите `modules` у `css-loader`, см. гайд `WEBPACK.md`).

7. Перейти на **webpack**: esbuild в проекте больше не используем. Настроить `webpack.config.mjs` по пошаговому гайду в ветке `task/WE-00` (файл `WEBPACK.md`) и собрать проект. Проверить результат в браузере.

## Требования к структуре

```text
index.html
package.json
tsconfig.json
webpack.config.mjs
src/
  index.tsx
  App.tsx
  App.module.css
  shared/
    ui/
      Spinner/
        Spinner.tsx
        Spinner.module.css
  entities/
    ip/
      api/
        getIpApi.ts
  widgets/
    IpViewer/
      IpViewer.tsx
      IpViewer.module.css
```

## Критерии готовности

- По клику на кнопку виден **спиннер**, пока идёт запрос.
- При успехе отображается **IP-адрес**.
- При ошибке — **понятное сообщение**.
- Компоненты — настоящие React-компоненты, возвращающие JSX.
- Приложение рендерится в `#app` через `createRoot`.
- Стили подключены через **CSS-модули** (`*.module.css`) и собираются в бандл.
- Сборка и dev-режим настроены через **webpack** (по гайду `WEBPACK.md`).

## Работа с репозиторием

- Если вы берёте мой проект, берите ветку `task/CAT-01-demo` и делайте PR в ветку `task/RE-01`.
- Если вы переделываете своё приложение из `task/CAT-01`, PR тоже делайте в ветку `task/RE-01`.

Подробнее про то, как мы работаем с репозиториями, — в [README.md](README.md).

## Ресурсы

- [Презентации курса (Google Drive)](https://drive.google.com/drive/folders/1dQFBPJ4BL9fk2z7Z02mZG_nGh5jGCPN0?usp=sharing)
- [React: официальная документация](https://react.dev/)
- [React: быстрый старт](https://react.dev/learn)
- [React + TypeScript: types](https://react.dev/learn/typescript)
- [webpack: get started](https://webpack.js.org/guides/getting-started/)
- [TypeScript: tsconfig reference](https://www.typescriptlang.org/tsconfig)
