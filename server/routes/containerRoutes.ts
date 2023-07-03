import express, { Request, Response } from 'express';
import containerController from '../controllers/containerController';

// create router for container path
const containerRouter = express.Router();

// get all active ontainers
// INPUT: nothing
// OUTPUT: array of objects [{},{}]
containerRouter.get(
  '/all-active-containers',
  containerController.getAllRunningContainers,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

// get active container names
// INPUT: nothing
// OUTPUT: array of objects [{},{}]
containerRouter.get(
  '/all-active-containers-names',
  containerController.getAllRunningContainersNames,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.containersNames);
  }
);

// stop a specific container
// INPUT: object with name value, {"name": "mongodb"}
// OUTPUT: array of object [{"message": "container12345"}]
containerRouter.post(
  '/stop',
  containerController.stopASpecificContainer,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.stoppedContainer);
  }
);

// start a specific container
// INPUT: object with name value, {"name": "mongodb"}
// OUTPUT: array of object [{"message": "container12345"}]
containerRouter.post(
  '/start',
  containerController.startASpecificContainer,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.startedContainer);
  }
);

// delete all stopped containers
// INPUT: nothing
// OUTPUT: array of objects containing property and array of values [{"Deleted Containers:": ["container12345", "container123456"], "Total reclaimed space:": ["Total reclaimed space: 932.4kB"]}]
containerRouter.delete(
  '/prune-stopped-containers',
  containerController.pruneStoppedContainers,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deletedContainers);
  }
);

// get logs for a specific container
// INPUT: query /log?name=myContainer
// OUTPUT: array of objects [{}, {}]
containerRouter.get(
  '/log',
  containerController.getSpecificLog,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.log);
  }
);

// removes stopped container by name
// INPUT: object with name value, {"name": "mongodb"}
// OUTPUT: array of object [{"message": "container12345"}]
// other tests: when you run docker ps -a, the container should be gone
containerRouter.delete(
  '/remove-specific-container',
  containerController.removeSpecificContainer,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.removedContainer);
  }
);
containerRouter.use('/', (_req: Request, res: Response) => {
  res.send('containerRouter test');
});

export default containerRouter;
