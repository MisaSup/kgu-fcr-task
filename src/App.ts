import HomePage from './pages/Home/HomePage.js';
import type { Component } from './shared/lib/components/types.js';

const App: Component = () => {
    return `${HomePage({})}`;
};

export default App;
