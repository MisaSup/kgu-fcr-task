import "../public/styles.css";
import App from "./App";
import Spinner from "./shared/ui/Spinner/Spinner";
import { getIpApi } from "./entities/ip/api/getIpApi";

const loadIp = async (
  button: HTMLButtonElement,
  result: HTMLElement,
): Promise<void> => {
  button.disabled = true;
  result.classList.remove("ip-viewer__result_error");
  result.innerHTML = Spinner();

  try {
   // Показываем IP-адрес, полученный из ipify.
    const ip = await getIpApi();
    result.textContent = ip;
  } catch {
    result.textContent = "Не удалось загрузить IP-адрес. Попробуйте ещё раз.";
    result.classList.add("ip-viewer__result_error");
  } finally {
    button.disabled = false;
  }
};

const setupIpViewer = (root: HTMLElement): void => {
  const button = root.querySelector<HTMLButtonElement>("[data-ip-show]");
  const result = root.querySelector<HTMLElement>("[data-ip-result]");

  if (!button || !result) {
    return;
  }

  button.addEventListener("click", () => {
    void loadIp(button, result);
  });
};

const render = (): void => {
  const appRoot = document.querySelector<HTMLElement>("#app");

  if (!appRoot) {
    return;
  }

  appRoot.innerHTML = App();
  setupIpViewer(appRoot);
};

window.onload = render;
