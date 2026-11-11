import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <span className={styles.spinner} role="status" aria-label="Загрузка">
      <span className={styles.circle} />
    </span>
  );
};

export default Spinner;
