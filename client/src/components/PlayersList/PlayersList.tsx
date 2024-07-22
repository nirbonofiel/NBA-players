import React, { useCallback, useRef } from 'react';
import Player from '../Player/Player';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import "./styles.css";
import { fetchPlayers } from '../../store/playersSlice';

const PlayersList: React.FC = () => {
    const { players, loading, next_cursor, last_search, error } = useSelector((state: RootState) => state.players);
    const dispatch = useDispatch<AppDispatch>();
    const observer = useRef<IntersectionObserver>();

    const lastPlayerElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && next_cursor) {
                dispatch(fetchPlayers({ path: 'players', cursor: next_cursor, search: last_search }));
            }
        });
        if (node) observer.current.observe(node);
    }, [loading,next_cursor, dispatch]);

    if (error) return <div>{error}</div>;

    return (
        <div className='players-container'>
            {loading &&
                <CircularProgress />
            }
            {players && players.map((player,index) => (
                players.length === index +1 ?
                < Player ref={lastPlayerElementRef} player = { player } key = { player.id }/> :
                < Player player = { player } key = { player.id } />
            ))}
        </div>
    );
};

export default PlayersList;