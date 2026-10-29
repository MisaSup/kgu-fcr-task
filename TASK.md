# RE-00

Переводим наш проект анкеты на **React**.

До этого мы собирали интерфейс «по-реактовски» руками: компонент — это функция, которая возвращает строку с HTML, а `MainContent` вставляет её через `innerHTML`. Теперь сделаем то же самое, но настоящим React: с JSX, компонентами и рендером в корневой элемент `#app`.

Перед рефакторингом убедимся, что проект уже на **TypeScript** — это точка входа задания.

## Что нужно сделать

1. Проверить, что проект переведён на TypeScript:
   - `tsconfig.json` настроен (`rootDir`, `module`, `moduleResolution`);
   - все компоненты лежат в `.ts`;
   - есть общий тип компонента в `src/shared/lib/components/types.ts`;
   - в `package.json` есть скрипты `build`, `dev` и `typecheck`.

2. Установить React и типы:

   ```bash
   npm install react react-dom
   npm install --save-dev @types/react @types/react-dom
   ```

3. Подключить JSX в `tsconfig.json` (`"jsx": "react-jsx"`) и разрешить `.tsx` в сборке.

4. Переписать компоненты из «функция → строка» в React-компоненты (`Header`, `Navigation`, `Footer`, `MainContent`, `ProfileSection`, `TeamsSection`, `TeamGrid`, `TeamChip`) — теперь они возвращают JSX.

5. Отрендерить приложение в `#app` через `createRoot` из `react-dom/client` в `src/index.tsx`.

6. Сохранить структуру и сборку: собрать проект **esbuild**-ом и проверить результат в браузере.

## Требования к структуре

```text
src/
  pages/
  widgets/
  shared/
    lib/
      components/
        types.ts
  App.tsx
  index.tsx
```

## Работа с репозиторием

- Если вы переделываете свой проект, PR нужно сделать в ветку `task/RE-00`.

Подробнее про то, как мы работаем с репозиториями, — в [README.md](README.md).

## Ресурсы

- [Презентации курса (Google Drive)](https://drive.google.com/drive/folders/1dQFBPJ4BL9fk2z7Z02mZG_nGh5jGCPN0?usp=sharing)
- [React: официальная документация](https://react.dev/)
- [React: быстрый старт](https://react.dev/learn)
- [React + TypeScript: types](https://react.dev/learn/typescript)
- [esbuild + JSX](https://esbuild.github.io/content-types/#jsx)
- [TypeScript: tsconfig reference](https://www.typescriptlang.org/tsconfig)
