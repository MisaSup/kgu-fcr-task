import type { Component } from '../../../../shared/lib/components/types.js';
import { TeamsChampionshipItem } from '../TeamGrid/TeamGrid.js';

type TeamChipProps = {
  teamName: string;
  color: string;
};

const TeamChip: Component<TeamsChampionshipItem> = ({ team_name, points_current, position_current }) => {

    const text = `${position_current}. ${team_name} - ${points_current}`
    return `
          <div class="team-chip" role="listitem">
            <span class="team-chip__stripe" aria-hidden="true"></span>
            ${text}
          </div>
    `;
};

export default TeamChip;
