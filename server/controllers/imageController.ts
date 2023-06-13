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
      res.locals.images = stdout;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in imageController.getAllImages",
        err: error,
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
      res.locals.ranContainer = `Running Container ID: ${stdout}`;
      next();
    } catch (error) {
      next({
        log: "error in the imageController.runContainerFromImage middleware",
        err: error,
      });
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
      res.locals.ranContainerWithRemove = `Running Container ID: ${stdout}`;
      next();
    } catch (error) {
      next({
        log: "error in the imageController.runContainerFromImage middleware",
        err: error,
      });
    }
  },

  // run container with remove when it stops
  deleteImage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { image } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(`docker rmi ${image}`);
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the imageController.runContainerFromImage exec",
          err: stderr,
          message: `Failed to delete image: ${image}`,
        };
        next(errorDetails);
      }
      res.locals.imagesDeleted = `Removed Image: ${stdout}`;
      next();
    } catch (error) {
      next({
        log: "error in the imageController.runContainerFromImage middleware",
        err: error,
      });
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
      res.locals.output = stdout;
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
      res.locals.output = stdout;
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
          log: "error in the imageController.removeSingleImage exec",
          err: stderr,
          message: "error in the imageController.removeSingleImage exec",
        };
        next(errorDetails);
      }
      res.locals.output = stdout;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "",
        err: error,
        message: "error in the imageController.pruneDanglingImages catch",
      };
      next(errorDetails);
    }
  },
};

export default imageController;
