import dotenv from 'dotenv';
// import 'dotenv/config'
import express, { Express, Request, Response, RequestHandler } from 'express';
// const path = require('path');
import imageRouter from './routes/imageRoutes'

const PORT = process.env.PORT || 3000;

dotenv.config();
const app: Express = express();

app.use(express.json());

// Routes

//routes for handling image path

app.use('/image', imageRouter)
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
