import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchPlayers } from '../../store/playersSlice';
import "./styles.css";

const Search: React.FC = React.memo(() => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleGetShows = () => {
        dispatch(fetchPlayers({ path: 'players', cursor: 0, search: search }));
        setSearch('');
    }

    const handleSetValue = (e: any) => {
        setSearch(e.target.value);
    }

    return (
        <div className='search-container'>
            <TextField id="outlined-basic" variant="outlined" value={search} onChange={handleSetValue} />
            <Button variant="outlined" color="primary" onClick={handleGetShows} disabled={search === ''}>Search</Button>
        </div>
    );
});

export default Search;