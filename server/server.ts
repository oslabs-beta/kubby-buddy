import dotenv from 'dotenv';
// import 'dotenv/config'
import express, { Express, Request, Response, RequestHandler } from 'express';
// const path = require('path');
import imageRouter from './routes/imageRoutes'
import generalDockerRouter from './routes/generaldockerRoutes';

const PORT = process.env.PORT || 3000;

dotenv.config();
const app: Express = express();

app.use(express.json());

//--------------- ROUTES  ---------------//

//routes for handling image command

app.use('/image', imageRouter)

//routes for handling all other docker commands

app.use('/general', generalDockerRouter)

// const route = require('./routes/<filename.js>')
// app.use('path', route)

// Catch all
app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: RequestHandler) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`BEEP BOOP! Rockin' out on port ${PORT}`);
});
