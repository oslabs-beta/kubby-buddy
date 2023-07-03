import express, { Request, Response } from 'express';
import volumeController from '../controllers/volumeController';

// create router for volume path
const volumeRouter = express.Router();

// get all volumes
// INPUT: nothing
// OUTPUT: array of objects [{},{}]
volumeRouter.get(
  '/all-volumes',
  volumeController.getAllVolumes,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.volumes);
  }
);

// get all volume names
// INPUT: nothing
// OUTPUT: array of objects [{},{}]
volumeRouter.get(
  '/all-volumes-names',
  volumeController.getAllVolumesNames,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.volumesNames);
  }
);

/**
// delete all volumes
// INPUT: nothing
// OUTPUT: array of objects containing property and array of values 
[{ "Deleted Volumes:": ["86006985e7dd01ad25be4812d1b1d2de1ac3159437ccc06f3b61f233dfec533c", "39e417afc8bea1a2a8dd7c11c17b54f71386187c9fe86a21b3b3bbd391906307"], "Total reclaimed space:": ["Total reclaimed space: 315MB"]}]
 */
volumeRouter.delete(
  '/all-volumes',
  volumeController.deleteAllVolumes,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deletedVolumes);
  }
);

/**
// delete all anonymous volumes
// INPUT: nothing
// OUTPUT: array of objects containing property and array of values 
[{ "Deleted Volumes:": ["86006985e7dd01ad25be4812d1b1d2de1ac3159437ccc06f3b61f233dfec533c", "39e417afc8bea1a2a8dd7c11c17b54f71386187c9fe86a21b3b3bbd391906307"], "Total reclaimed space:": ["Total reclaimed space: 315MB"]}]
 */
volumeRouter.delete(
  '/all-anonymous-volumes',
  volumeController.deleteAllAnonymousVolumes,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deletedAnonymous);
  }
);

// POST volume stats
// INPUT: {volume: "volumeID"}
// OUTPUT: array of objects [{}]
volumeRouter.post(
  '/volume-stats',
  volumeController.volumeStats,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.volumeStats);
  }
);

// POST create a volume
// INPUT: {name: "volumeName"}
// OUTPUT: array of objects [{}]
volumeRouter.post(
  '/create-volume',
  volumeController.createVolume,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.createVolume);
  }
);

// DELETE delete colume
// INPUT: {volume: "volumeName"}
// OUTPUT: array of objects [{}]
volumeRouter.delete(
  '/delete-volume',
  volumeController.deleteVolume,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deleteVolume);
  }
);
export default volumeRouter;
