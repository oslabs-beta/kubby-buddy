import { Request, Response, NextFunction } from "express";
import { exec } from "node:child_process";
import { ContainerController } from "../../types";
import { promisify } from "util";
import { ErrorDetails } from "../../types";
const promisifyExec = promisify(exec);

const containerController: ContainerController = {
  //middleware to run CLI command to get list of active containers

  getAllRunningContainers: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker ps --format '{{json .}}'"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the containerController.getAllRunningContainers exec",
          err: stderr,
          message:
            "error in the containerController.getAllRunningContainers exec",
        };
        next(errorDetails);
      }
      const dataArray = stdout
        .trim()
        .split("\n")
        .map((item) => JSON.parse(item, undefined)); // Use undefined as the reviver
      res.locals.containers = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in containerController.getAllRunningContainers",
        err: error,
        message: "failed to get all running containers",
      };
      next(errorDetails);
    }
  },

  // get active container names
  getAllRunningContainersNames: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        `docker container ls --format='{{json .Names}}'`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the containerController.getAllRunningContainersNames exec",
          err: stderr,
          message:
            "error in the containerController.getAllRunningContainersNames exec",
        };
        next(errorDetails);
      }
      res.locals.containersNames = stdout;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in containerController.getAllRunningContainersNames",
        err: error,
        message: "failed to get all running container names",
      };
      next(errorDetails);
    }
  },

  //middleware to stop a specific container

  stopASpecificContainer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(`docker stop ${name}`);
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the containerController.stopASpecificContainer exec",
          err: stderr,
          message:
            "error in the containerController.stopASpecificContainer exec",
        };
        next(errorDetails);
      }
      console.log([{ message: stdout }]);
      res.locals.stoppedContainer = [{ message: stdout }];
      // res.locals.stoppedContainer = `Stopped container: ${stdout}`;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in containerController.stopASpecificContainer",
        err: error,
        message: `failed to stop container: ${name}`,
      };
      next(errorDetails);
    }
  },

  //middleware to start a specific container

  startASpecificContainer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(`docker start ${name}`);
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the containerController.startASpecificContainer exec",
          err: stderr,
          message:
            "error in the containerController.startASpecificContainer exec",
        };
        next(errorDetails);
      }
      res.locals.startedContainer = `Started container: ${stdout}`;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in containerController.startASpecificContainer",
        err: error,
        message: `failed to start container: ${name}`,
      };
      next(errorDetails);
    }
  },

  //middleware to prune all stopped containers

  pruneStoppedContainers: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        `docker container prune --force`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the containerController.pruneStoppedContainers exec",
          err: stderr,
          message:
            "error in the containerController.pruneStoppedContainers exec",
        };
        next(errorDetails);
      }
      res.locals.deletedContainers = stdout;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in containerController.pruneStoppedContainers",
        err: error,
        message: "failed to prune stopped containers",
      };
      next(errorDetails);
    }
  },

  //get log for a specific container

  getSpecificLog: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query);
    const { name } = req.query;
    try {
      const { stdout, stderr } = await promisifyExec(
        `docker container logs ${name}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the containerController.getSpecificLog exec",
          err: stderr,
          message: "error in the containerController.getSpecificLog exec",
        };
        next(errorDetails);
      }
      res.locals.log = stdout;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in containerController.getSpecificLog",
        err: error,
        message: `failed to get logs for container: ${name}`,
      };
      next(errorDetails);
    }
  },
};

export default containerController;
