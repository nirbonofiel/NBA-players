import express, { Express } from "express";
import cors from "cors";
import playersRouter from './controllers/playersController';

const bodyParser = require('body-parser');

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const BASE_API_ROUTE = '/api'

app.use(BASE_API_ROUTE + '/players',playersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});