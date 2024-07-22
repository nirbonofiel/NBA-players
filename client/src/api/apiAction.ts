import axiosInstance from './axiosInstanse';

export const fetchPlayersApi = async(path: string,search?: string, cursor?: number) => {
    try{
        const res = await axiosInstance.get(path,{params: {
            cursor,
            search}
        });
        return {players: res.data.data.players, next_cursor: res.data.data.next_cursor, last_search: search}
    }catch (error){
        throw error;
    }
}

export const fetchPlayersStatsApi = async(path: string, player_id: number) => {
    try{
        const res = await axiosInstance.get(path,{params: {
            player_id,
            }
        });
        return res.data
    }catch (error){
        throw error;
    }
}

