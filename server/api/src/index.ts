import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Router } from 'express';
import mongoose from 'mongoose';

import avRouter from '../routes/av.route';

// initialize configuration
dotenv.config();

const app = express();
const routes = Router();
const jsonParser = bodyParser.json();
const PORT = process.env.PORT;

app.use(routes);
app.use(jsonParser);

//db connection
const db_uri = process.env.MONGO_DB as string;
mongoose.connect(db_uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ : Connection error:'));
db.once('open', () => {
    console.log('🍃 : MongoDB database connection established successfully');
});

// define a route handler for the default home page
app.get('/', (req, res) => res.send("❤️ Hello World! ❤️"));

//define routes
routes.use('/api/av', avRouter);

app.listen(PORT, () => {
    console.log(`⚡️ : Server is running at http://localhost:${PORT}`);
});
app.on('error', console.error.bind(console, '❌ : Server error:'));
