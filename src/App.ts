import type { Component } from "./shared/lib/components/types";
import IpViewer from "./widgets/IpViewer/IpViewer";

const App: Component = () => {
  return `
    <main class="app">
      <h1 class="app__title">Мой IP</h1>
      ${IpViewer()}
    </main>
  `;
};

export default App;
