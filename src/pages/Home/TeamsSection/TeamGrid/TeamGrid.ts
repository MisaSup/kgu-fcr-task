import TeamChip from '../TeamChip/TeamChip.js';
import Spinner from '../../../../shared/lib/components/Spinner/Spinner.js';
import type { Component } from '../../../../shared/lib/components/types.js';
import * as z from "zod";

type Team = {
  teamName: string;
  color: string;
};

type ChampionshipTeam = {
  meeting_key: string;
  points_current: number;
  points_start: number;
  position_current: number;
  position_start: number;
  session_key: number;
  team_name: string;
};

const TeamsChampionshipsSchema = z.object({
  points_current: z.number(),
  position_current: z.number(),
  team_name: z.string(),
}).array()

export type TeamsChampionshipItem = z.infer<typeof TeamsChampionshipsSchema>[number]

const teams: Team[] = [
  { teamName: 'Ferrari', color: 'red' },
  { teamName: 'Red Bull', color: 'orange' },
  { teamName: 'Mercedes', color: 'silver' },
  { teamName: 'McLaren', color: 'papaya' },
  { teamName: 'Aston Martin', color: 'green' },
  { teamName: 'Alpine', color: 'blue' },
];

const TeamsGrid: Component = () => {
  return `
        <div class="team-grid" role="list">
        </div>
    `;
};

export const requestTeamGridData = async () => {
  const container = document.querySelector('.team-grid');

  if (!container) {
    return;
  }

  container.innerHTML = Spinner({});

  try {
    const rawData = await fetch(
      "https://api.openf1.org/v1/championship_teams?session_key=latest",
    );
    const data: ChampionshipTeam[] = await rawData.json()

    const championshipData = TeamsChampionshipsSchema.parse(data);

    container.innerHTML = championshipData.map((chip) => TeamChip(chip)).join('');
  } catch (error) {
    if (error instanceof z.ZodError) {
      container.innerHTML = `
      <div class="error-state" role="alert">
      <span class="error-state__icon">!</span>
      <h2 class="error-state__title">Error!</h2>
      <p class="error-state__message">${z.prettifyError(error)}</p>
      </div>
      `;
    } else {

      container.innerHTML = `
      <div class="error-state" role="alert">
      <span class="error-state__icon">!</span>
      <h2 class="error-state__title">Error!</h2>
      <p class="error-state__message">${error}</p>
      </div>
      `;
    }
  }

}

export default TeamsGrid;
