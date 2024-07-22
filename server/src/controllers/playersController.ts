import express from "express";
import { PlayerService } from "../services/playersService";

const router = express.Router();

router.get('/',PlayerService.getPlayers);
router.get('/stats',PlayerService.getPlayerStats);

export default router;