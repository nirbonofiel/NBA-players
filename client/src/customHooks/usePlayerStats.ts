import { useState, useEffect } from 'react';
import { PlayerStats } from '../types/types';
import { fetchPlayersStatsApi } from '../api/apiAction';

const usePlayerStats = (player_id: number) => {
  const [stats, setStats] = useState<PlayerStats>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetchPlayersStatsApi('players/stats', player_id);
      setStats(response);
    } catch (err) {
      setError('Failed to fetch players stats');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, [player_id]);

  return { stats, loading, error };
};

export default usePlayerStats;