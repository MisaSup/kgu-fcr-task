import type { Component } from "../../../shared/lib/components/types.js";

const ProfileSection: Component = () => {
    return `
          <section class="hero" aria-labelledby="hero-title">
        <img class="hero__img" src="http://172.30.82.99:3000/assets/hero.svg" alt="Болид Формулы-1 на трассе">
        <div class="hero__body">
          <h1 class="hero__title" id="hero-title">Стань частью <span>Pit Lane</span></h1>
          <p class="hero__text">Анкета болельщика Формулы-1: расскажи о своей команде, пилоте и любви к гонкам.</p>
          <div class="btn-row">
            <a class="btn btn--ghost" href="/public/profile">Мой профиль</a> 
          </div>
        </div>
      </section>
    `;
};

export default ProfileSection;
