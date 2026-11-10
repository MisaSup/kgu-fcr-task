import "../public/styles.css";
import App from "./App";
import Spinner from "./shared/ui/Spinner/Spinner";
import { getIpApi } from "./entities/ip/api/getIpApi";

const setupIpViewer = (root: HTMLElement) => {
  const button = root.querySelector<HTMLButtonElement>("[data-ip-show]");
  const result = root.querySelector<HTMLDivElement>("[data-ip-result]");

  if (!button || !result) {
    return;
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    result.classList.remove("ip-viewer__result_error");
    result.innerHTML = Spinner();

    try {
      const ip = await getIpApi();
      result.textContent = ip;
    } catch (error) {
      result.classList.add("ip-viewer__result_error");
      result.textContent = "Не удалось получить IP-адрес. Попробуйте позже.";
    } finally {
      button.disabled = false;
    }
  });
};

const render = () => {
  const appRoot = document.querySelector<HTMLElement>("#app");

  if (!appRoot) {
    return;
  }

  appRoot.innerHTML = App();
  setupIpViewer(appRoot);
};

window.onload = render;
