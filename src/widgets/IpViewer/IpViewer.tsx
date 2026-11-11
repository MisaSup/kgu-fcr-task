import { useState } from "react";
import { getIpApi } from "../../entities/ip/api/getIpApi";
import Spinner from "../../shared/ui/Spinner/Spinner";
import styles from "./IpViewer.module.css";

const IpViewer = () => {
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShowIp = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getIpApi();
      setIp(data);
    } catch {
      setError("Не удалось получить IP-адрес. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const resultClassName = error
    ? `${styles.result} ${styles.resultError}`
    : styles.result;

  return (
    <section className={styles.ipViewer}>
      <div className={resultClassName} data-ip-result>
        {loading ? (
          <Spinner />
        ) : error ? (
          error
        ) : ip ? (
          ip
        ) : (
          "IP ещё не загружен"
        )}
      </div>
      <button
        className={styles.button}
        type="button"
        data-ip-show
        onClick={handleShowIp}
        disabled={loading}
      >
        Показать мой IP
      </button>
    </section>
  );
};

export default IpViewer;
