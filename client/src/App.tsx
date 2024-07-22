import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Grid } from '@mui/material';
import { AppDispatch, RootState } from './store/store';
import { useEffect } from 'react';
import { fetchPlayers } from './store/playersSlice';
import FavoritePlayersList from './components/FavoritePlayersList/FavoritePlayersList';
import NBAPlayers from './components/NBAPlayers/NBAPlayers';



function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { next_cursor } = useSelector((state: RootState) => state.players);

  useEffect(() => {
      dispatch(fetchPlayers({ path: 'players', cursor: next_cursor > 0 ? next_cursor : undefined }));
  }, [dispatch])

  return (
    <Grid container
      direction="row"
      justifyContent="space-around"
      alignItems="stretch"
      className='App'>
      <NBAPlayers />
      <FavoritePlayersList />
    </Grid>
  );
}

export default App;
