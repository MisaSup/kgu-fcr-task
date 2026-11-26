import { useEffect, useState } from 'react';
import * as z from 'zod';
import Spinner from '../../../../shared/lib/components/Spinner/Spinner.js';
import TeamChip from '../TeamChip/TeamChip.js';

const TeamsChampionshipsSchema = z
    .object({
        points_current: z.number(),
        position_current: z.number(),
        team_name: z.string(),
    })
    .array();

export type TeamsChampionshipItem = z.infer<typeof TeamsChampionshipsSchema>[number];

const TeamsGrid = () => {
    const [teams, setTeams] = useState<TeamsChampionshipItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        const loadTeams = async () => {
            try {
                const rawData = await fetch(
                    'https://api.openf1.org/v1/championship_teams?session_key=latest',
                );
                const data: unknown = await rawData.json();
                const championshipData = TeamsChampionshipsSchema.parse(data);

                if (!ignore) {
                    setTeams(championshipData);
                }
            } catch (caught) {
                if (ignore) {
                    return;
                }

                setError(
                    caught instanceof z.ZodError ? z.prettifyError(caught) : String(caught),
                );
            }
        };

        loadTeams();

        return () => {
            ignore = true;
        };
    }, []);

    if (error) {
        return (
            <div className="error-state" role="alert">
                <span className="error-state__icon">!</span>
                <h2 className="error-state__title">Error!</h2>
                <p className="error-state__message">{error}</p>
            </div>
        );
    }

    if (!teams) {
        return <Spinner />;
    }

    return (
        <div className="team-grid" role="list">
            {teams.map((team) => (
                <TeamChip key={team.team_name} {...team} />
            ))}
        </div>
    );
};

export default TeamsGrid;
