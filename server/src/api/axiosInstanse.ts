import axios from 'axios';
import { PLAYERS_TOKEN , PLAYERS_URL } from "../constants/ApiConstants";

const instance = axios.create({
  baseURL: PLAYERS_URL,
  headers: {
    'Authorization': PLAYERS_TOKEN, 
  },
});

export default instance;