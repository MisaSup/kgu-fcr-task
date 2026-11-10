import IpViewer from "./widgets/IpViewer/IpViewer";
import type { Component } from "./shared/lib/components/types";

const App: Component = () => {
  return `
    <main class="app">
      <h1 class="app__title">Мой IP</h1>
      ${IpViewer()}
    </main>
  `;
};

export default App;
