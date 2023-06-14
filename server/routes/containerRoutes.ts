import express, { Request, Response } from "express";
import containerController from "../controllers/containerController";

const containerRouter = express.Router();

//get info about all active ontainers
//OUTPUT: array of objects
containerRouter.get(
  "/all-active-containers",
  containerController.getAllRunningContainers,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

//get active container names
//OUTPUT: array of objects
containerRouter.get(
  "/all-active-containers-names",
  containerController.getAllRunningContainersNames,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.containersNames);
  }
);

//stop a specific container
//OUTPUT: array of object
containerRouter.post(
  "/stop",
  containerController.stopASpecificContainer,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.stoppedContainer);
  }
);

//start a specific container
//OUTPUT: array of object
containerRouter.post(
  "/start",
  containerController.startASpecificContainer,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.startedContainer);
  }
);

//prune all stopped containers
//OUTPUT: array of object.... it's not good
containerRouter.delete(
  "/prune-stopped-containers",
  containerController.pruneStoppedContainers,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deletedContainers);
  }
);

//get logs for a specific container
//OUTPUT: array of objects
containerRouter.get(
  "/log",
  containerController.getSpecificLog,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.log);
  }
);

//INPUT: body with key of name and property of stopped container's name
//OUTPUT: array of an object with key name message and value of deleted container's name
//other tests: when you run docker ps -a, the container should be gone

//removes stopped container by name
containerRouter.delete(
  "/remove-specific-container",
  containerController.removeSpecificContainer,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.removedContainer);
  }
);
containerRouter.use("/", (_req: Request, res: Response) => {
  res.send("containerRouter test");
});

export default containerRouter;
