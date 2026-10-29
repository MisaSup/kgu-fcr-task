import App from './App.js';

const render = (): void => {
    const appRoot = document.querySelector<HTMLElement>('#app');

    if (!appRoot) {
        throw new Error('Root element #app not found');
    }

    appRoot.innerHTML = App({});
};

window.onload = render;
