import dotenv from "dotenv";
// import 'dotenv/config'
import express, { Express, Request, Response, RequestHandler } from "express";
// const path = require('path');
import imageRouter from "./routes/imageRoutes";
import generalDockerRouter from "./routes/generaldockerRoutes";
import containerRouter from "./routes/containerRoutes";
import volumeRouter from "./routes/volumeRouter";
import { ServerError, GlobalErr } from "../types";

const PORT = process.env.PORT || 3000;

dotenv.config();
const app: Express = express();

app.use(express.json());

//--------------- ROUTES  ---------------//

// Routes for handling image commands

app.use("/image", imageRouter);

// Routes for handling container commands

app.use("/container", containerRouter);

// Routes for handling volumes

app.use("/volume", volumeRouter);

// Routes for handling all other docker commands

app.use("/general", generalDockerRouter);

// const route = require('./routes/<filename.js>')
// app.use('path', route)

// Catch all
app.use("*", (_req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

// Global error handler
app.use(
  (err: ServerError, _req: Request, res: Response, _next: RequestHandler) => {
    const defaultErr: GlobalErr = {
      log: "Express error handler caught unknown middleware error",
      status: 500,
      message: {
        err: "An error occured",
      },
    };
    const errorObj: ServerError = Object.assign(defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

// Server listen
app.listen(PORT, () => {
  console.log(`BEEP BOOP! Rockin' out on port ${PORT}`);
});
