import type { FC } from "react";

const Header: FC = () => {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Pit Lane — на главную">
        <img className="brand__logo" src="assets/logo.svg" alt="Логотип Pit Lane F1 Fan Club" />
      </a>
      <span className="header__badge">F1 Fan Club</span>
    </header>
  );
};

export default Header;
