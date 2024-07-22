import React from 'react';
import Search from '../Search/Search';
import PlayersList from '../PlayersList/PlayersList';
import { Typography } from '@mui/material';
import "./styles.css";

const NBAPlayers: React.FC = () => {

    return (
        <div>
            <Typography variant='h3' className='nba-title' sx={{marginTop:3,marginBottom:3}}>NBA Players</Typography>
            <Search />
            <PlayersList />
        </div>
    );
};

export default NBAPlayers;