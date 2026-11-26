import type { FC } from "react";
import TeamsGrid from "./TeamGrid/TeamGrid.js";

const TeamsSection: FC = () => {
  return (
    <section aria-labelledby="teams-title">
      <h2 className="section-title" id="teams-title">
        Команды сезона
      </h2>
      <TeamsGrid />
    </section>
  );
};

export default TeamsSection;
