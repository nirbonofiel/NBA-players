import React, { forwardRef } from 'react';
import { Card,IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PlayerData } from '../../types/types';
import { addToFavorite, removeFromFavorite } from '../../store/playersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import PlayerDetails from '../PlayerDetails/PlayerDetails';

type PlayerProps = {
    player: PlayerData;
}


const Player = React.memo(forwardRef<HTMLDivElement, PlayerProps>(({ player },ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const { first_name, last_name, team_name } = player

    const { favPlayers } = useSelector((state: RootState) => state.players);
    const isFavorite = favPlayers.some(p => p.id === player.id);

    const handleAddFavPlayer = () => {
        dispatch(addToFavorite(player));
    };

    const handleRemoveFavPlayer = () => {
        dispatch(removeFromFavorite(player));
    };

    return (
        <Card sx={{ maxWidth: 400, padding: 1, display: 'flex', justifyContent: 'space-between' }} ref={ref}>
            <div>
                <PlayerDetails first_name={first_name} last_name={last_name} team_name={team_name} style={{ fontSize: 14 }} />
            </div>
            <IconButton aria-label="add to favorites" onClick={() => isFavorite ? handleRemoveFavPlayer() : handleAddFavPlayer()}>
                {isFavorite ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon color='error' />}
            </IconButton>
        </Card>)
})
);

export default Player;
