import "../public/styles.css";
import App from "./App.js";

const setupIpViewer = (root) => {
  const button = root.querySelector("[data-ip-show]");
  const result = root.querySelector("[data-ip-result]");

  if (!button || !result) {
    return;
  }

  button.addEventListener("click", () => {
    result.classList.add("ip-viewer__result_error");
    result.textContent = "Ошибка: API ещё не подключён";
  });
};

const render = () => {
  const appRoot = document.querySelector("#app");

  if (!appRoot) {
    return;
  }

  appRoot.innerHTML = App();
  setupIpViewer(appRoot);
};

window.onload = render;
