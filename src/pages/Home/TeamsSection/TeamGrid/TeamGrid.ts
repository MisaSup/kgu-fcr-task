import TeamChip from '../TeamChip/TeamChip.js';
import type { Component } from '../../../../shared/lib/components/types.js';

type Team = {
  teamName: string;
  color: string;
};

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
          ${teams.map((chip) => TeamChip(chip)).join('')}
        </div>
    `;
};

export default TeamsGrid;
