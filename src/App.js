import IpViewer from "./widgets/IpViewer/IpViewer.js";

const App = () => {
  return `
    <main class="app">
      <h1 class="app__title">Мой IP</h1>
      ${IpViewer()}
    </main>
  `;
};

export default App;
