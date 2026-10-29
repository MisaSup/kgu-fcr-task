import type { Component } from '../../../../shared/lib/components/types.js';

type TeamChipProps = {
  teamName: string;
  color: string;
};

const TeamChip: Component<TeamChipProps> = ({ teamName, color }) => {
    return `
          <div class="team-chip team-chip--${color}" role="listitem">
            <span class="team-chip__stripe" aria-hidden="true"></span>
            ${teamName}
          </div>
    `;
};

export default TeamChip;
