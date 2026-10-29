import type { Component } from '../../shared/lib/components/types.js';

const Navigation: Component = () => {
    return `
    <nav class="site-nav" aria-label="Основная навигация">
      <a class="site-nav__link" href="/" aria-current="page">Главная</a>
      <a class="site-nav__link" href="/public/profile">Профиль</a>
    </nav>
    `;
};

export default Navigation;
