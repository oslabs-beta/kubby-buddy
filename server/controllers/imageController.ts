import { Request, Response, NextFunction } from "express";
import { exec, ExecException } from "child_process";

interface ErrorDetails {
  log: string;
  err?: ExecException | Error | unknown;
  message?: string;
}

const imageController = {
  getAllImages: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await exec(
        "docker images --format json",
        (error: ExecException | null, stdout: string, _stderr: string) => {
          if (error) {
            const errorDetails: ErrorDetails = {
              log: "error in exec of imageController.getAllImages",
              err: error,
              message: `Failed to get all images`,
            };
            next(errorDetails);
          }
          res.locals.images = stdout;
          next();
        }
      );
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
      await exec(
        `docker run -d --name ${name} ${image}`,
        (error: ExecException | null, stdout: string, _stderr: string) => {
          if (error) {
            next({
              log: "error in the imageController.runContainerFromImage exec",
              err: error,
              message: `Failed to run image: ${name} ${image}`,
            });
          }
          res.locals.ranContainer = `Running Container ID: ${stdout}`;
          next();
        }
      );
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
      await exec(
        `docker run -d --rm --name ${name} ${image}`,
        (error: ExecException | null, stdout: string, _stderr: string) => {
          if (error) {
            next({
              log: "error in the imageController.runContainerFromImage exec",
              err: error,
              message: `Failed to run image: ${name} ${image}`,
            });
          }
          res.locals.ranContainerWithRemove = `Running Container ID: ${stdout}`;
          next();
        }
      );
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
      await exec(
        `docker rmi ${image}`,
        (error: ExecException | null, stdout: string, _stderr: string) => {
          if (error) {
            next({
              log: "error in the imageController.runContainerFromImage exec",
              err: error,
              message: `Failed to delete image: ${image}`,
            });
          }
          res.locals.imagesDeleted = `Removed Image: ${stdout}`;
          next();
        }
      );
    } catch (error) {
      next({
        log: "error in the imageController.runContainerFromImage middleware",
        err: error,
      });
    }
  },
};

export default imageController;
