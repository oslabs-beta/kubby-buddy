import { Request, Response, NextFunction } from 'express';
import { ExecException } from 'child_process';

export type MiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface ContainerController {
  getAllRunningContainers: MiddleWare;

  getAllRunningContainersNames: MiddleWare;

  stopASpecificContainer: MiddleWare;

  startASpecificContainer: MiddleWare;

  pruneStoppedContainers: MiddleWare;

  getSpecificLog: MiddleWare;

  removeSpecificContainer: MiddleWare;
}

export interface ImageController {
  getAllImages: MiddleWare;

  runContainerFromImage: MiddleWare;

  // runContainerFromImageWithRemove: MiddleWare;

  // runContainerFromImageWithNamedVolume: MiddleWare;

  // runContainerFromImageWithNamedVolumeAndRemove: MiddleWare;

  pruneUnusedImages: MiddleWare;

  pruneDanglingImages: MiddleWare;

  removeSingleImage: MiddleWare;
}

export interface StatsStreamController {
  getAllContainerStats: MiddleWare;
}

export interface VolumeController {
  getAllVolumes: MiddleWare;

  getAllVolumesNames: MiddleWare;

  deleteAllVolumes: MiddleWare;

  deleteAllAnonymousVolumes: MiddleWare;
}

export interface ServerError {
  log: string;
  status: number;
  message: {
    err: string;
  };
}

export interface GlobalErr {
  log: string;
  status: number;
  message: {
    err: string;
  };
}

export interface ErrorDetails {
  log: string;
  err?: ExecException | Error | unknown;
  message?: string;
}
