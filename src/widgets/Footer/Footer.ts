import type { Component } from '../../shared/lib/components/types.js';

const Footer: Component = () => {
    return `
    <footer class="site-footer">
      <div class="site-footer__top">
        <img class="site-footer__logo" src="http://172.30.82.99:3000/assets/logo.svg" alt="Логотип Pit Lane F1 Fan Club">
      </div>
      <nav class="site-footer__nav" aria-label="Навигация в подвале">
        <a href="/">Главная</a>
        <a href="/public/profile">Профиль</a>
      </nav>
      <div class="site-footer__contacts">
        <span>Связь с клубом:</span>
        <a href="mailto:pitlane@f1fan.example">pitlane@f1fan.example</a>
        <span>Краснодар · паддок у экрана</span>
      </div>
      <p class="site-footer__copy">&copy; 2026 Pit Lane F1 Fan Club</p>
    </footer>
    `;
};

export default Footer;
