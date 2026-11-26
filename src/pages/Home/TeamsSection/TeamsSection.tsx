import TeamsGrid from "./TeamGrid/TeamGrid.js";
import type { Component } from "../../../shared/lib/components/types.js";

const TeamsSection: Component = () => {
    return `
      <section aria-labelledby="teams-title">
        <h2 class="section-title" id="teams-title">Команды сезона</h2>
        ${TeamsGrid({})}
      </section>
    `;
};

export default TeamsSection;
