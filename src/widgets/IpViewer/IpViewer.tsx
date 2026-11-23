import { useState } from "react";
import Spinner from "../../shared/ui/Spinner/Spinner";
import { getIpApi } from "../../entities/ip/api/getIpApi";
import styles from "./IpViewer.module.css";

type IpState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; ip: string }
  | { status: "error"; message: string };

const IpViewer = () => {
  const [state, setState] = useState<IpState>({ status: "idle" });

  const handleShowIp = async () => {
    setState({ status: "loading" });

    try {
      const ip = await getIpApi();
      setState({ status: "success", ip });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      setState({ status: "error", message });
    }
  };

  const renderResult = () => {
    switch (state.status) {
      case "idle":
        return <span>IP ещё не загружен</span>;
      case "loading":
        return <Spinner />;
      case "success":
        return <span>{state.ip}</span>;
      case "error":
        return <span>Ошибка: {state.message}</span>;
    }
  };

  return (
    <section className={styles.ipViewer}>
      <div
        className={`${styles.ipViewerResult} ${
          state.status === "error" ? styles.ipViewerResultError : ""
        }`}
      >
        {renderResult()}
      </div>
      <button
        className={styles.ipViewerButton}
        type="button"
        onClick={handleShowIp}
        disabled={state.status === "loading"}
      >
        Показать мой IP
      </button>
    </section>
  );
};

export default IpViewer;
