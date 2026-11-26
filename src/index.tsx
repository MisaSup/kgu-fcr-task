import { createRoot } from "react-dom/client";
import App from "./App.js";

const render = (): void => {
  const appRoot = document.querySelector<HTMLElement>("#app");

  if (!appRoot) {
    throw new Error("Root element #app not found");
  }

  createRoot(appRoot).render(<App />);
};

window.onload = render;
