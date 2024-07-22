import axiosInstance from '../api/axiosInstanse';
import { Request, Response } from "express";
import { PlayerData, PlayerStats } from '../types/types';
export class PlayerService {

    static async getPlayers(req: Request, res: Response) {
        try {
            const { cursor,search } = req.query;
            const respose = await axiosInstance.get('players',{params: {
                cursor,
                search}
            });
            const mappedData = respose.data.data.map((elem:any)=>PlayerService.mapPlayerData(elem));
            res.json({data: {players:mappedData, next_cursor: respose.data.meta.next_cursor}});
        } catch (error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getPlayerStats(req: Request, res: Response) {
        try {
            const { player_id } = req.query;
            const respose = await axiosInstance.get('season_averages',{params: {
                season:2023,
                'player_ids[]':player_id}
            });
            const mappedData = respose.data.data.map((elem:any)=>PlayerService.mapPlayerStats(elem));
            res.json(mappedData[0]);
        } catch (error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    
    static mapPlayerData = (resposeData: any): PlayerData => {
        return {
          id: resposeData.id,
          first_name: resposeData.first_name,
          last_name:resposeData.last_name,
          team_name: resposeData.team.full_name
        };
    };

    static mapPlayerStats = (resposeData: any): PlayerStats => {
        return {
          player_id: resposeData.player_id,
          ast: resposeData.ast,
          games_played: resposeData.games_played,
          min: resposeData.min,
          pts: resposeData.pts,
          reb: resposeData.reb 
        };
    };
}