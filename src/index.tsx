import { createRoot } from "react-dom/client";
import App from "./App";

const appRoot = document.querySelector("#app");

if (!appRoot) {
  throw new Error("Не найден корневой элемент #app");
}

createRoot(appRoot).render(<App />);
