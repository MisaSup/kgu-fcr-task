# WEBPACK. Пошаговая настройка от пустого файла до dev и prod

Учебный гайд: собираем `webpack.config.mjs` с нуля — от минимального конфига из документации до готовой конфигурации с dev-сервером, горячей перезагрузкой и production-оптимизациями.

Официальная точка входа: <https://webpack.js.org/guides/getting-started/>

Презентации: <https://drive.google.com/drive/folders/1dQFBPJ4BL9fk2z7Z02mZG_nGh5jGCPN0?usp=sharing>

## Требования

- **Node.js 20.11+** (в `webpack.config.mjs` используется `import.meta.url`; рекомендую Node 24).
- Пакетный менеджер: **npm** (идёт с Node) или **bun**.
- Базовое понимание `import`/`export`.

> В гайде команды даны для двух менеджеров. Выполняйте блок **только для одного** из них.

## Шаг 0. Создаём проект и ставим webpack

```bash
mkdir webpack-demo
cd webpack-demo

# npm
npm init -y
npm install webpack webpack-cli --save-dev

# bun
bun init -y
bun add webpack webpack-cli --dev
```

Создаём структуру файлов (пока заглушки):

```
webpack-demo/
├── package.json
├── src/
│   └── index.js
└── public/
    └── index.html
```

`src/index.js`:

```js
console.log("Hello, webpack!");
```

`public/index.html`:

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack demo</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

## Шаг 1. Минимальный `webpack.config.mjs`

Файла ещё нет — создаём его руками в корне проекта. Это шаблон из [webpack get started](https://webpack.js.org/guides/getting-started/):

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

// В Node.js до нативной поддержки import.meta.dirname
// получаем __dirname из import.meta.url.
// (Node 20.11+ умеет import.meta.dirname и import.meta.filename.)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

Запускаем первую сборку:

```bash
npx webpack --mode development
```

В папке `dist/` появится `main.js`. Это уже рабочая сборка, но без HTML и без dev-сервера.

> Почему `.mjs`: расширение `.mjs` всегда означает ES-модуль, поэтому `import` работает без `"type": "module"` в `package.json`. Альтернатива — оставить `webpack.config.js` и добавить `"type": "module"`.

## Шаг 2. Подключаем HTML — `HtmlWebpackPlugin`

Плагин сам создаёт `index.html` в `dist/` и подставляет в него собранные скрипты.

```bash
# npm
npm install html-webpack-plugin --save-dev

# bun
bun add html-webpack-plugin --dev
```

Добавляем в конфиг импорт и секцию `plugins`:

```js
import HtmlWebpackPlugin from "html-webpack-plugin";

// ...

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

## Шаг 3. Dev-сервер и горячая перезагрузка (HMR)

Устанавливаем `webpack-dev-server`:

```bash
# npm
npm install webpack-dev-server --save-dev

# bun
bun add webpack-dev-server --dev
```

Добавляем блок `devServer` и скрипт `dev` в `package.json`:

```js
export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 3000,
    hot: true, // Hot Module Replacement
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

`package.json`:

```json
"scripts": {
  "dev": "webpack serve --mode development"
}
```

Запуск:

```bash
npm run dev
# или
bun run dev
```

Теперь при изменении `src/index.js` страница обновляется без полной перезагрузки.

## Шаг 4. CSS

```bash
# npm
npm install css-loader style-loader --save-dev

# bun
bun add css-loader style-loader --dev
```

Правило для CSS. **Порядок важен**: loaders применяются справа налево, поэтому `style-loader` пишется первым.

```js
export default {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

Теперь можно импортировать стили прямо в JS: `import "./style.css";`

## Шаг 5. Изображения, шрифты и медиа

Ассеты выносим отдельными файлами через `asset/resource` и складываем в подпапки:

```js
export default {
  // ...
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name].[contenthash][ext]",
  },
  module: {
    rules: [
      // ...правило для CSS

      // Изображения
      {
        test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[contenthash][ext]",
        },
      },
      // Шрифты
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash][ext]",
        },
      },
      // Аудио и видео
      {
        test: /\.(mp3|wav|mp4|webm)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/media/[name].[contenthash][ext]",
        },
      },
    ],
  },
};
```

## Шаг 6. TypeScript и JSX через `esbuild-loader`

`esbuild-loader` компилирует TS/JSX очень быстро и умеет минифицировать.

```bash
# npm
npm install esbuild-loader --save-dev

# bun
bun add esbuild-loader --dev
```

```js
export default {
  // ...
  module: {
    rules: [
      // ...правила для CSS и ассетов

      {
        test: /\.[jt]sx?$/, // .js, .jsx, .ts, .tsx
        loader: "esbuild-loader",
        options: {
          target: "es2015",
        },
      },
    ],
  },
};
```

> `esbuild` ставится как зависимость `esbuild-loader`. Если его нет — добавьте `esbuild` вручную (`npm install esbuild --save-dev`).

## Шаг 7. Убираем хардкод `MODE` — конфиг становится функцией

Плохо: `const MODE = "development";` — режим зашит в файл, и приходится править код руками.
Хорошо: webpack сам передаёт режим в конфиг. Делаем конфиг функцией `(env, argv)` и берём `argv.mode`.

```js
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import esbuildLoader from "esbuild-loader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: argv.mode ?? "development",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      // Позволяет писать import "./App" без расширения
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      static: path.resolve(__dirname, "public"),
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          loader: "esbuild-loader",
          options: { target: "es2015" },
        },
      ],
    },
  };
};
```

- `argv.mode` приходит из CLI: `webpack serve --mode development` или `webpack --mode production`.
- `isProd` — единый флаг, по которому дальше включаем/выключаем оптимизации.
- `devtool` тоже зависит от режима: быстрые source maps в dev, полноценные в prod.

## Шаг 8. Production-оптимизации

В production включаем:

1. **contenthash в именах** — кэш браузера сбрасывается только для изменённых файлов.
2. **`clean: true`** — чистим `dist` перед сборкой.
3. **минификацию** через `EsbuildPlugin` (`minimize: isProd`).
4. **разделение чанков** `splitChunks` — выносим `node_modules` в отдельный `vendors`.
5. **вынос CSS в файл** через `MiniCssExtractPlugin` вместо инъекции `<style>`.

```bash
# npm
npm install mini-css-extract-plugin --save-dev

# bun
bun add mini-css-extract-plugin --dev
```

Итоговые изменения в конфиге (внутри функции):

```js
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const { EsbuildPlugin } = esbuildLoader;

export default (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: argv.mode ?? "development",
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      // в prod — хеш, в dev — стабильное имя для быстрых пересборок
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      assetModuleFilename: "assets/[name].[contenthash][ext]",
      clean: true,
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new EsbuildPlugin({ target: "es2015", minify: true, css: true }),
      ],
      // splitChunks имеет смысл только для prod-сборки
      splitChunks: isProd
        ? {
            chunks: "all",
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/, // всё из node_modules
                name: "vendors", // имя выходного файла
                priority: 10, // приоритет группы
                reuseExistingChunk: true,
              },
            },
          }
        : false,
    },
    devServer: {
      static: path.resolve(__dirname, "public"),
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      // CSS в отдельный файл только в prod
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
          ]
        : []),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          // Порядок важен! Читаем справа налево.
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.[jt]sx?$/,
          loader: "esbuild-loader",
          options: { target: "es2015" },
        },
        {
          test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.(mp3|wav|mp4|webm)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/media/[name].[contenthash][ext]",
          },
        },
      ],
    },
  };
};
```

## Итоговый `webpack.config.mjs`

Полный готовый конфиг:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import esbuildLoader from "esbuild-loader";

const { EsbuildPlugin } = esbuildLoader;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: argv.mode ?? "development",
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      assetModuleFilename: "assets/[name].[contenthash][ext]",
      clean: true,
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new EsbuildPlugin({ target: "es2015", minify: true, css: true }),
      ],
      splitChunks: isProd
        ? {
            chunks: "all",
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                priority: 10,
                reuseExistingChunk: true,
              },
            },
          }
        : false,
    },
    devServer: {
      static: path.resolve(__dirname, "public"),
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
          ]
        : []),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.[jt]sx?$/,
          loader: "esbuild-loader",
          options: { target: "es2015" },
        },
        {
          test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.(mp3|wav|mp4|webm)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/media/[name].[contenthash][ext]",
          },
        },
      ],
    },
  };
};
```

## Скрипты `package.json`

```json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

- `npm run dev` / `bun run dev` — dev-сервер с HMR.
- `npm run build` / `bun run build` — production-сборка в `dist/`.

## Troubleshooting

- **`ERR_REQUIRE_ESM` / `Cannot use import statement`** — конфиг с `import` должен быть `.mjs` **или** в `package.json` должен стоять `"type": "module"`.
- **Стили не применяются** — проверьте порядок loaders: они работают справа налево, `style-loader` (или `MiniCssExtractPlugin.loader`) всегда первый.
- **`Module not found: ./App`** — добавьте расширение или правило `resolve.extensions`.
- **HMR не работает** — убедитесь, что запускаете `webpack serve` (не `webpack`), и что `hot: true` задан.
- **`contenthash` пустой/мешает в dev** — используйте условное имя файла (`isProd ? "[name].[contenthash].js" : "[name].js"`), как в конфиге выше.
- **Ассеты не копируются** — проверьте, что тип `asset/resource` и файл действительно импортируется в JS/CSS.

## Ресурсы

- [webpack get started](https://webpack.js.org/guides/getting-started/)
- [webpack docs](https://webpack.js.org/)
- [Презентации курса](https://drive.google.com/drive/folders/1dQFBPJ4BL9fk2z7Z02mZG_nGh5jGCPN0?usp=sharing)
