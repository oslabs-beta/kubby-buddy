import { Request, Response, NextFunction } from "express";
import { exec } from "node:child_process";

const volumeController = {
  getAllVolumes: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await exec("docker volume ls", (error, stdout, _stderr) => {
        if (error) {
          next({
            log: "error in the volumeController.getAllVolumes exec call",
            message: error,
          });
        }
        res.locals.volumes = stdout;
        next();
      });
    } catch (error) {
      next({
        log: "error in the volumeController.getAllVolumes middleware",
        message: error,
      });
    }
  },

  // get volume names
  getAllVolumesNames: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await exec(
        `docker volume ls --format '{ "name": "{{ .Name }}"}'`,
        (error, stdout, _stderr) => {
          if (error) {
            next({
              log: "error in the volumeController.getAllVolumes exec call",
              message: error,
            });
          }
          res.locals.volumesNames = stdout;
          next();
        }
      );
    } catch (error) {
      next({
        log: "error in the volumeController.getAllVolumes middleware",
        message: error,
      });
    }
  },

  //there's a work around for mac, but not sure about windows
  deleteAllVolumes: async (
    _req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      await exec("docker volume prune --force", (error, stdout, _stderr) => {
        if (error) {
          next({
            log: "error in the volumeController.deleteAll Volumes exec call",
            message: error,
          });
        }
        console.log(stdout.trim());
        next();
      });
    } catch (error) {
      next({
        log: "error in the volumeController.deleteAllVolumes middleware",
        message: error,
      });
    }
  },
};

export default volumeController;
