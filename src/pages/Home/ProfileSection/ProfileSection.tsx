import type { FC } from "react";

const ProfileSection: FC = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero__img" src="assets/hero.svg" alt="Болид Формулы-1 на трассе" />
      <div className="hero__body">
        <h1 className="hero__title" id="hero-title">
          Стань частью <span>Pit Lane</span>
        </h1>
        <p className="hero__text">
          Анкета болельщика Формулы-1: расскажи о своей команде, пилоте и любви к гонкам.
        </p>
        <div className="btn-row">
          <a className="btn btn--ghost" href="/public/profile">
            Мой профиль
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
