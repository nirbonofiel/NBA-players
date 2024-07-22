import { Typography } from '@mui/material';
import React from 'react';
import "./styles.css";

type PlayerDetailsProps = {
    first_name: string;
    last_name: string;
    team_name: string;
    style: any;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = React.memo(({ first_name, last_name, team_name, style }) => {
    const fullName = `${first_name} ${last_name}`
    return (
        <>
            <Typography variant="h5" component="span" className='full-name'>
                {fullName}
            </Typography>
            <Typography sx={style} color="text.secondary" className='team-name'>
                {team_name}
            </Typography>
        </>
    );
});

export default PlayerDetails;