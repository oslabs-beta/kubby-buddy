import { Request, Response, NextFunction } from "express";
import { exec } from "node:child_process";
import { VolumeController, ErrorDetails } from "../../types";
import { promisify } from "node:util";
const promisifyExec = promisify(exec);

const volumeController: VolumeController = {
  getAllVolumes: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker volume ls --format json"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the volumeController.getAllVolumes exec call",
          err: stderr,
          message: "error in the volumeController.getAllVolumes exec call",
        };
        next(errorDetails);
      }
      const dataArray = stdout
        .trim()
        .split("\n")
        .map((item) => JSON.parse(item, undefined));
      res.locals.volumes = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in the volumeController.getAllVolumes catch",
        err: error,
        message: "error in the volumeController.getAllVolumes catch",
      };
      next(errorDetails);
    }
  },

  // get volume names
  getAllVolumesNames: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        `docker volume ls --format='{{json .Name}}'`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the volumeController.getAllVolumes exec call",
          err: stderr,
          message: "error in the volumeController.getAllVolumes exec call",
        };
        next(errorDetails);
      }
      const parsedOutput = stdout
        .trim()
        .split("\n")
        .map((item) => {
          const name = JSON.parse(item, undefined);
          return { name };
        });
      res.locals.volumesNames = parsedOutput;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in the volumeController.getAllVolumesNames catch",
        err: error,
        message: "error in the volumeController.getAllVolumesNames catch",
      };
      next(errorDetails);
    }
  },

  //there's a work around for mac, but not sure about windows
  deleteAllVolumes: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker volume prune -a --force"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the volumeController.deleteAll Volumes exec call",
          err: stderr,
          message: "error in the volumeController.deleteAll Volumes exec call",
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split("\n");
      const deletedVolumesIndex = dataArray.findIndex(
        (item) => item === "Deleted Volumes:"
      );
      const reclaimedSpaceIndex = dataArray.findIndex((item) =>
        item.startsWith("Total reclaimed space:")
      );

      const deletedVolumes = dataArray
        .slice(deletedVolumesIndex + 1, reclaimedSpaceIndex)
        .map((item) => item.trim())
        .filter((item) => item !== ""); // Filter out empty strings

      const reclaimedSpace = dataArray
        .slice(reclaimedSpaceIndex)
        .map((item) => item.trim());

      const output = [
        {
          "Deleted Volumes:": deletedVolumes,
          "Total reclaimed space:": reclaimedSpace,
        },
      ];
      res.locals.deletedVolumes = output;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in the volumeController.deleteAllVolumes catch",
        err: error,
        message: "error in the volumeController.deleteAllVolumes catch",
      };
      next(errorDetails);
    }
  },

  deleteAllAnonymousVolumes: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker volume prune --force"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the volumeController.deleteAllAnonymousVolumes",
          err: stderr,
          message: "error in the volumeController.deleteAllAnonymousVolumes",
        };
        next(errorDetails);
      }

      const dataArray = stdout.trim().split("\n");
      const deletedVolumesIndex = dataArray.findIndex(
        (item) => item === "Deleted Volumes:"
      );
      const reclaimedSpaceIndex = dataArray.findIndex((item) =>
        item.startsWith("Total reclaimed space:")
      );

      const deletedVolumes = dataArray
        .slice(deletedVolumesIndex + 1, reclaimedSpaceIndex)
        .map((item) => item.trim())
        .filter((item) => item !== ""); // Filter out empty strings

      const reclaimedSpace = dataArray
        .slice(reclaimedSpaceIndex)
        .map((item) => item.trim());

      const output = [
        {
          "Deleted Volumes:": deletedVolumes,
          "Total reclaimed space:": reclaimedSpace,
        },
      ];
      res.locals.deletedAnonymous = output;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in the volumeController.deleteAllAnonymousVolumes catch",
        err: error,
        message:
          "error in the volumeController.deleteAllAnonymousVolumes catch",
      };
      next(errorDetails);
    }
  },
};

export default volumeController;
