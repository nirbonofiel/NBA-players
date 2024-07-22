import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.balldontlie.io/v1/',
  headers: {
    'Authorization': 'c6cc2159-a33f-4c43-bc19-8e9fa968be73', 
  },
});

export default instance;