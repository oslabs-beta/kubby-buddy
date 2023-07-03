import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import { ContainerController } from '../../types';
import { promisify } from 'util';
import { ErrorDetails } from '../../types';
const promisifyExec = promisify(exec);

export const cmdGetAllRunningContainers: string = `docker ps -a --format '{{json .}}'`;
export const cmdGetAllRunningContainersNames: string = `docker container ls --format='{{json .Names}}'`;
export const cmdStopASpecificContainer: string = `docker stop `;
export const cmdStartASpecificContainer: string = `docker start `;
export const cmdPruneStoppedContainers: string = `docker container prune --force`;
export const cmdGetSpecificLog: string = `docker container logs`;
export const cmdRemoveSpecificContainer: string = `docker rm `;

interface ParseOutputContainers {
  Names: string;
  Status: string;
}

interface ParseOutputStartStop {
  message: string;
}

interface ParseOutputPruneStoppedContainers {
  'Deleted Containers:': string[];
  'Total reclaimed space:': string[];
}
interface ParseOutputRemoveSpecificContainer {
  message: string;
}

export function parseOutputContainers(
  data: string | Buffer
): ParseOutputContainers[] {
  const parsedOutput = data
    .toString()
    .trim()
    .split('\n')
    .map((item) => JSON.parse(item, undefined));

  return parsedOutput;
}

export function parseOutputContainersNames(
  data: string | Buffer
): Array<{ name: string }> {
  const parsedOutput = data
    .toString()
    .trim()
    .split('\n')
    .map((item) => {
      const name = JSON.parse(item, undefined);
      return { name };
    });

  return parsedOutput;
}

export function parseOutputStartStop(
  data: string | Buffer
): ParseOutputStartStop[] {
  const parsedOutput = [
    {
      message: Buffer.isBuffer(data)
        ? data.toString().replace(/[\r\n]+/gm, '')
        : data.replace(/[\r\n]+/gm, ''),
    },
  ];
  return parsedOutput;
}

export function parseOutputPruneStoppedContainers(
  stdout: string | Buffer
): ParseOutputPruneStoppedContainers[] {
  const data = stdout.toString().trim();
  const dataArray = data.split('\n');
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

  return output;
}

export function transformLogs(stdout: string | Buffer): Array<{}> {
  const dataArray = stdout.toString().trim().split('\n');
  let transformedLogs: any[];

  transformedLogs = dataArray.map((item) => {
    try {
      return JSON.parse(item, undefined);
    } catch (error) {
      if (item.includes('=')) {
        const keyValuePairs = item.split(' ').map((pair) => pair.split('='));
        return Object.fromEntries(keyValuePairs);
      } else {
        return { [item]: null };
      }
    }
  });

  return transformedLogs;
}

export function parseOutputRemoveSpecificContainer(
  stdout: string | Buffer
): ParseOutputRemoveSpecificContainer[] {
  const output = stdout.toString().trim();
  return [{ message: output }];
}

export const containerController: ContainerController = {
  //middleware to run CLI command to get list of active containers

  getAllRunningContainers: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        cmdGetAllRunningContainers
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
      res.locals.containers = parseOutputContainers(stdout);
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
        cmdGetAllRunningContainersNames
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
      // Use undefined as the reviver
      res.locals.containersNames = parseOutputContainersNames(stdout);
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
    console.log('Request body:', req.body);
    if (req.body === undefined) {
      next();
    }
    const { name } = req.body;

    try {
      const { stdout, stderr } = await promisifyExec(
        `${cmdStopASpecificContainer} ${name}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the containerController.stopASpecificContainer exec',
          err: stderr,
          message:
            'error in the containerController.stopASpecificContainer exec',
        };
        next(errorDetails);
      }
      res.locals.stoppedContainer = parseOutputStartStop(stdout);
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
      const { stdout, stderr } = await promisifyExec(
        `${cmdStartASpecificContainer} ${name}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the containerController.startASpecificContainer exec',
          err: stderr,
          message:
            'error in the containerController.startASpecificContainer exec',
        };
        next(errorDetails);
      }
      res.locals.startedContainer = parseOutputStartStop(stdout);
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
        `${cmdPruneStoppedContainers}`
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
      res.locals.deletedContainers = parseOutputPruneStoppedContainers(stdout);
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
      const { stdout } = await promisifyExec(`${cmdGetSpecificLog} ${name} `);

      res.locals.log = transformLogs(stdout);
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
      const { stdout, stderr } = await promisifyExec(
        `${cmdRemoveSpecificContainer} ${name}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the containerController.removeSpecificContainer exec',
          err: stderr,
          message: `failed to finish delete route for ${name} in exec`,
        };
        next(errorDetails);
      }
      res.locals.removedContainer = parseOutputRemoveSpecificContainer(stdout);
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
