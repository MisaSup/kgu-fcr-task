import type { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer__top">
                <img
                    className="site-footer__logo"
                    src="http://172.30.82.99:3000/assets/logo.svg"
                    alt="Логотип Pit Lane F1 Fan Club"
                />
            </div>
            <nav className="site-footer__nav" aria-label="Навигация в подвале">
                <a href="/">Главная</a>
                <a href="/public/profile">Профиль</a>
            </nav>
            <div className="site-footer__contacts">
                <span>Связь с клубом:</span>
                <a href="mailto:pitlane@f1fan.example">pitlane@f1fan.example</a>
                <span>Краснодар · паддок у экрана</span>
            </div>
            <p className="site-footer__copy">&copy; 2026 Pit Lane F1 Fan Club</p>
        </footer>
    );
};

export default Footer;
