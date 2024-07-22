import React from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import FavoritePlayer from '../FavoritePlayer/FavoritePlayer';
import { PlayerData } from '../../types/types';
import "./styles.css";

const FavoritePlayersList: React.FC = () => {
    const { favPlayers } = useSelector((state: RootState) => state.players);

    return (
        <div>
            <Typography variant='h3' className='fav-title' sx={{marginTop:3,marginBottom:3}}>Favorite Players</Typography>
            {favPlayers && favPlayers.map((player: PlayerData) => (
                <FavoritePlayer player={player} key={player.id} />
            ))}
        </div>
    );
};

export default FavoritePlayersList;