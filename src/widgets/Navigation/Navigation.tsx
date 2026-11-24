import type { FC } from 'react';

const Navigation: FC = () => {
    return (
        <nav className="site-nav" aria-label="Основная навигация">
            <a className="site-nav__link" href="/" aria-current="page">
                Главная
            </a>
            <a className="site-nav__link" href="/public/profile">
                Профиль
            </a>
        </nav>
    );
};

export default Navigation;
