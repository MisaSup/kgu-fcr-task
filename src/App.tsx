import IpViewer from "./widgets/IpViewer/IpViewer";
import styles from "./App.module.css";

const App = () => {
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Мой IP</h1>
      <IpViewer />
    </main>
  );
};

export default App;
