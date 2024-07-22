import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Typography } from '@mui/material';
import { PlayerData } from '../../types/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import usePlayerStats from '../../customHooks/usePlayerStats';
import PlayerDetails from '../PlayerDetails/PlayerDetails';

type PlayerProps = {
    player: PlayerData;
}


const FavoritePlayer: React.FC<PlayerProps> = React.memo(({ player }) => {
    const { error, loading, stats } = usePlayerStats(player.id)
    const { first_name, last_name, team_name } = player;

    if (error) return <div>{error}</div>;

    return (
        <Accordion sx={{ maxWidth: 400 }}>
            {loading &&
                <CircularProgress />
            }
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                <PlayerDetails first_name={first_name} last_name={last_name} team_name={team_name}
                    style={{ fontSize: 14, marginLeft: '5px', alignSelf: 'end' }} />
            </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex' }}>
            {stats ?
                    <><Typography>
                        games: {stats.games_played}
                    </Typography><Typography>
                            min: {stats.min}
                        </Typography><Typography>
                            pts: {stats.pts}
                        </Typography><Typography>
                            reb: {stats.reb}
                        </Typography><Typography>
                            ast:  {stats.ast}
                        </Typography></>
                    :
                 <Typography>
                    No stats from last year
                </Typography>
            }
                </AccordionDetails>
        </Accordion>
    )
});

export default FavoritePlayer;


