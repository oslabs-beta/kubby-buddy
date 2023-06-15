import { Request, Response, NextFunction } from "express";
import { exec } from "child_process";
import { ImageController, ErrorDetails } from "../../types";
import { promisify } from "node:util";
const promisifyExec = promisify(exec);

const imageController: ImageController = {
  getAllImages: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker images --format json"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in exec of imageController.getAllImages",
          err: stderr,
          message: "error in exec of imageController.getAllImages",
        };
        next(errorDetails);
      }
      const dataArray = stdout
        .trim()
        .split("\n")
        .map((item) => JSON.parse(item, undefined)); // Use undefined as the reviver
      res.locals.images = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in imageController.getAllImages catch",
        err: error,
        message: `error in exec of imageController.getAllImages catch`,
      };
      next(errorDetails);
    }
  },

  runContainerFromImage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, image } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(
        `docker run -d --name ${name} ${image}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the imageController.runContainerFromImage exec",
          err: stderr,
          message: "error in the imageController.runContainerFromImage exec",
        };
        next(errorDetails);
      }
      const output = stdout.trim();
      res.locals.ranContainer = [{ message: output }];
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in imageController.runContainerFromImage catch",
        err: error,
        message: `error in exec of imageController.runContainerFromImage catch`,
      };
      next(errorDetails);
    }
  },

  // run container with remove when it stops
  runContainerFromImageWithRemove: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, image } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(
        `docker run -d --rm --name ${name} ${image}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the imageController.runContainerFromImage exec",
          err: stderr,
          message: "error in the imageController.runContainerFromImage exec",
        };
        next(errorDetails);
      }
      res.locals.ranContainerWithRemove = [{ message: stdout.trim() }];
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in imageController.runContainerFromImageWithRemove catch",
        err: error,
        message: `error in exec of imageController.runContainerFromImageWithRemove catch`,
      };
      next(errorDetails);
    }
  },

  // prune unused images (ones not actively connected with a container)

  pruneUnusedImages: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker image prune -a --force"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the exec of imageController.pruneUnusedImages",
          err: stderr,
          message: "error in the exec of imageController.pruneUnusedImages",
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split("\n");
      res.locals.output = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in the imageController.pruneUnusedImages catch",
        err: error,
        message: "error in the imageController.pruneUnusedImages catch",
      };
      next(errorDetails);
    }
  },

  //prune only dangling images (ones without a tag)
  pruneDanglingImages: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker image prune --force"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the exec of imageController.pruneDanglingImages",
          err: stderr,
          message: "error in the exec of imageController.pruneDanglingImages",
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split("\n");
      res.locals.output = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in the imageController.pruneDanglingImages catch",
        err: error,
        message: "error in the imageController.pruneDanglingImages catch",
      };
      next(errorDetails);
    }
  },

  //remove single image

  removeSingleImage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(`docker image rm ${name}`);
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: `error in the imageController.removeSingleImage exec for ${name}`,
          err: stderr,
          message: `error in the imageController.removeSingleImage exec for ${name}`,
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split("\n");
      // .map((item) => JSON.parse(item, undefined));
      res.locals.output = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: `error in the imageController.removeSingleImage in the catch for ${name}`,
        err: error,
        message: `error in the imageController.removeSingleImage catch for ${name}`,
      };
      next(errorDetails);
    }
  },
};

export default imageController;
