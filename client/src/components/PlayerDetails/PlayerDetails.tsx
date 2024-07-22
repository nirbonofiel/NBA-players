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
            <Typography variant="h5" component="span">
                {fullName}
            </Typography>
            <Typography sx={style} color="text.secondary">
                {team_name}
            </Typography>
        </>
    );
});

export default PlayerDetails;