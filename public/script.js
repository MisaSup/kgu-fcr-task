"use strict";(()=>{var d=()=>`
    <header class="site-header">
      <a class="brand" href="/" aria-label="Pit Lane \u2014 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E">
        <img class="brand__logo" src="http://172.30.82.99:3000/assets/logo.svg" alt="\u041B\u043E\u0433\u043E\u0442\u0438\u043F Pit Lane F1 Fan Club">
      </a>
      <span class="header__badge">F1 Fan Club</span>
    </header>
    `,o=d;var f=()=>`
    <nav class="site-nav" aria-label="\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F">
      <a class="site-nav__link" href="/" aria-current="page">\u0413\u043B\u0430\u0432\u043D\u0430\u044F</a>
      <a class="site-nav__link" href="/public/profile">\u041F\u0440\u043E\u0444\u0438\u043B\u044C</a>
    </nav>
    `,a=f;var h=({children:e})=>{if(!Array.isArray(e))throw new Error("MainContent must be an array of children");return`
        <main class="content">
            ${e.map(t=>t({})).join("")}
        </main>
    `},r=h;var u=()=>`
    <footer class="site-footer">
      <div class="site-footer__top">
        <img class="site-footer__logo" src="http://172.30.82.99:3000/assets/logo.svg" alt="\u041B\u043E\u0433\u043E\u0442\u0438\u043F Pit Lane F1 Fan Club">
      </div>
      <nav class="site-footer__nav" aria-label="\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u0432 \u043F\u043E\u0434\u0432\u0430\u043B\u0435">
        <a href="/">\u0413\u043B\u0430\u0432\u043D\u0430\u044F</a>
        <a href="/public/profile">\u041F\u0440\u043E\u0444\u0438\u043B\u044C</a>
      </nav>
      <div class="site-footer__contacts">
        <span>\u0421\u0432\u044F\u0437\u044C \u0441 \u043A\u043B\u0443\u0431\u043E\u043C:</span>
        <a href="mailto:pitlane@f1fan.example">pitlane@f1fan.example</a>
        <span>\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440 \xB7 \u043F\u0430\u0434\u0434\u043E\u043A \u0443 \u044D\u043A\u0440\u0430\u043D\u0430</span>
      </div>
      <p class="site-footer__copy">&copy; 2026 Pit Lane F1 Fan Club</p>
    </footer>
    `,n=u;var C=()=>`
          <section class="hero" aria-labelledby="hero-title">
        <img class="hero__img" src="http://172.30.82.99:3000/assets/hero.svg" alt="\u0411\u043E\u043B\u0438\u0434 \u0424\u043E\u0440\u043C\u0443\u043B\u044B-1 \u043D\u0430 \u0442\u0440\u0430\u0441\u0441\u0435">
        <div class="hero__body">
          <h1 class="hero__title" id="hero-title">\u0421\u0442\u0430\u043D\u044C \u0447\u0430\u0441\u0442\u044C\u044E <span>Pit Lane</span></h1>
          <p class="hero__text">\u0410\u043D\u043A\u0435\u0442\u0430 \u0431\u043E\u043B\u0435\u043B\u044C\u0449\u0438\u043A\u0430 \u0424\u043E\u0440\u043C\u0443\u043B\u044B-1: \u0440\u0430\u0441\u0441\u043A\u0430\u0436\u0438 \u043E \u0441\u0432\u043E\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u0435, \u043F\u0438\u043B\u043E\u0442\u0435 \u0438 \u043B\u044E\u0431\u0432\u0438 \u043A \u0433\u043E\u043D\u043A\u0430\u043C.</p>
          <div class="btn-row">
            <a class="btn btn--ghost" href="/public/profile">\u041C\u043E\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C</a> 
          </div>
        </div>
      </section>
    `,s=C;var b=({teamName:e,color:t})=>`
          <div class="team-chip team-chip--${t}" role="listitem">
            <span class="team-chip__stripe" aria-hidden="true"></span>
            ${e}
          </div>
    `,i=b;var y=[{teamName:"Ferrari",color:"red"},{teamName:"Red Bull",color:"orange"},{teamName:"Mercedes",color:"silver"},{teamName:"McLaren",color:"papaya"},{teamName:"Aston Martin",color:"green"},{teamName:"Alpine",color:"blue"}],_=()=>`
        <div class="team-grid" role="list">
          ${y.map(e=>i(e)).join("")}
        </div>
    `,p=_;var v=()=>`
      <section aria-labelledby="teams-title">
        <h2 class="section-title" id="teams-title">\u041A\u043E\u043C\u0430\u043D\u0434\u044B \u0441\u0435\u0437\u043E\u043D\u0430</h2>
        ${p({})}
      </section>
    `,m=v;var g=()=>`
        ${o({})}
        ${a({})}
        ${r({children:[s,m]})}
        ${n({})}
    `,l=g;var x=()=>`${l({})}`,c=x;var P=()=>{let e=document.querySelector("#app");if(!e)throw new Error("Root element #app not found");e.innerHTML=c({})};window.onload=P;})();
