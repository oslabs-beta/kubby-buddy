import { Request, Response, NextFunction } from 'express';
import { exec } from 'node:child_process';
import { ContainerController } from '../../types';
import { promisify } from 'util';
import { ErrorDetails } from '../../types';
const promisifyExec = promisify(exec);

function isJSON(data: string[]): boolean {
  try {
    for (const item of data) {
      console.log(`Parsing item: ${item}`);
      JSON.parse(item);
    }
    return true; // All elements are valid JSON strings
  } catch (error) {
    console.error(`Error parsing item: ${error}`);
    return false; // At least one element is not a valid JSON string
  }
}

let transformedLogs: any = 'placeholder';

const containerController: ContainerController = {
  //middleware to run CLI command to get list of active containers

  getAllRunningContainers: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker ps -a --format '{{json .}}'"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the containerController.getAllRunningContainers exec',
          err: stderr,
          message:
            'error in the containerController.getAllRunningContainers exec',
        };
        next(errorDetails);
      }
      const dataArray = stdout
        .trim()
        .split('\n')
        .map((item) => JSON.parse(item, undefined)); // Use undefined as the reviver
      res.locals.containers = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.getAllRunningContainers',
        err: error,
        message: 'failed to get all running containers',
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
          log: 'error in the containerController.getAllRunningContainersNames exec',
          err: stderr,
          message:
            'error in the containerController.getAllRunningContainersNames exec',
        };
        next(errorDetails);
      }
      const parsedOutput = stdout
        .trim()
        .split('\n')
        .map((item) => {
          const name = JSON.parse(item, undefined);
          return { name };
        }); // Use undefined as the reviver
      res.locals.containersNames = parsedOutput;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.getAllRunningContainersNames',
        err: error,
        message: 'failed to get all running container names',
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
          log: 'error in the containerController.stopASpecificContainer exec',
          err: stderr,
          message:
            'error in the containerController.stopASpecificContainer exec',
        };
        next(errorDetails);
      }
      const output = [{ message: stdout.replace(/[\r\n]+/gm, '') }];
      res.locals.stoppedContainer = output;
      // res.locals.stoppedContainer = `Stopped container: ${stdout}`;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.stopASpecificContainer',
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
          log: 'error in the containerController.startASpecificContainer exec',
          err: stderr,
          message:
            'error in the containerController.startASpecificContainer exec',
        };
        next(errorDetails);
      }
      const output = [{ message: stdout.replace(/[\r\n]+/gm, '') }];
      res.locals.startedContainer = output;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.startASpecificContainer',
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
          log: 'error in the containerController.pruneStoppedContainers exec',
          err: stderr,
          message:
            'error in the containerController.pruneStoppedContainers exec',
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split('\n');
      const deletedContainersIndex = dataArray.findIndex(
        (item) => item === 'Deleted Containers:'
      );
      const reclaimedSpaceIndex = dataArray.findIndex((item) =>
        item.startsWith('Total reclaimed space:')
      );

      const deletedContainers = dataArray
        .slice(deletedContainersIndex + 1, reclaimedSpaceIndex)
        .map((item) => item.trim())
        .filter((item) => item !== ''); // Filter out empty strings

      const reclaimedSpace = dataArray
        .slice(reclaimedSpaceIndex)
        .map((item) => item.trim());

      const output = [
        {
          'Deleted Containers:': deletedContainers,
          'Total reclaimed space:': reclaimedSpace,
        },
      ];
      res.locals.deletedContainers = output;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.pruneStoppedContainers',
        err: error,
        message: 'failed to prune stopped containers',
      };
      next(errorDetails);
    }
  },

  //get log for a specific container

  getSpecificLog: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query);
    const { name } = req.query;
    try {
      const { stdout } = await promisifyExec(`docker container logs ${name} `);
      // console.log('std', stderr);
      // if (stderr) {
      //   const errorDetails: ErrorDetails = {
      //     log: 'error in the containerController.getSpecificLog exec',
      //     err: stderr,
      //     message: 'error in the containerController.getSpecificLog exec',
      //   };
      //   next(errorDetails);
      // }
      // const dataArray = stdout
      //   .trim()
      //   .split('\n')
      // .map((item) => JSON.parse(item, undefined));
      // .map((item) => item, undefined);
      const dataArray = stdout.trim().split('\n');
      if (isJSON(dataArray)) {
        transformedLogs = dataArray.map((item) => JSON.parse(item, undefined));
      } else {
        transformedLogs = dataArray.map((log) => {
          if (log.includes('=')) {
            const keyValuePairs = log.split(' ').map((pair) => pair.split('='));
            return Object.fromEntries(keyValuePairs);
          } else {
            return { [log]: null };
          }
        });
      }

      res.locals.log = transformedLogs;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.getSpecificLog',
        err: error,
        message: `failed to get logs for container: ${name}`,
      };
      next(errorDetails);
    }
  },

  removeSpecificContainer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(`docker rm ${name}`);
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the containerController.removeSpecificContainer exec',
          err: stderr,
          message: `failed to finish delete route for ${name} in exec`,
        };
        next(errorDetails);
      }
      console.log(stdout.trim());
      res.locals.removedContainer = [{ message: stdout.trim() }];
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.removeSpecificContainer catch',
        err: error,
        message: `failed to finish delete route for ${name}`,
      };
      next(errorDetails);
    }
  },
};

export default containerController;
