import type { Component } from '../../shared/lib/components/types.js';

const Header: Component = () => {
    return `
    <header class="site-header">
      <a class="brand" href="/" aria-label="Pit Lane — на главную">
        <img class="brand__logo" src="http://172.30.82.99:3000/assets/logo.svg" alt="Логотип Pit Lane F1 Fan Club">
      </a>
      <span class="header__badge">F1 Fan Club</span>
    </header>
    `;
};

export default Header
