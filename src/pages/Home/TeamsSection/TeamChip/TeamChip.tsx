import type { FC } from 'react';
import type { TeamsChampionshipItem } from '../TeamGrid/TeamGrid.js';

const TeamChip: FC<TeamsChampionshipItem> = ({ team_name, points_current, position_current }) => {
    const text = `${position_current}. ${team_name} - ${points_current}`;

    return (
        <div className="team-chip" role="listitem">
            <span className="team-chip__stripe" aria-hidden="true"></span>
            {text}
        </div>
    );
};

export default TeamChip;
