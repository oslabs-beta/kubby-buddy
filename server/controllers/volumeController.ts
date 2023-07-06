import { Request, Response, NextFunction } from 'express';
import { exec } from 'node:child_process';
import { VolumeController, ErrorDetails } from '../../types';
import { promisify } from 'node:util';
const promisifyExec = promisify(exec);

const volumeController: VolumeController = {
  getAllVolumes: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { stdout: volumeOutput, stderr: volumeError } = await promisifyExec(
        'docker volume ls --format "{{json . }}"'
      );

      if (volumeError) {
        const errorDetails = {
          log: 'Error in the volumeController.getAllVolumes exec call',
          err: volumeError,
          message: 'Error in the volumeController.getAllVolumes exec call',
        };
        next(errorDetails);
        return;
      }

      const volumeDataArray = volumeOutput
        .trim()
        .split('\n')
        .map((item) => JSON.parse(item, undefined));

      console.log('VOL DATA', volumeDataArray);

      for (let i = 0; i < volumeDataArray.length; i++) {
        const volumeData = volumeDataArray[i];
        const { Name } = volumeData;
        console.log('NAME', Name);
        const { stdout: containerOutput } = await promisifyExec(
          `docker ps --filter "volume=${Name}" --format "{{json . }}"`
        );
        console.log('CON OUT', containerOutput);
        if (containerOutput !== '') {
          const parsedOutput = containerOutput
            .toString()
            .trim()
            .split('\n')
            .map((item) => JSON.parse(item, undefined));

          const stats = parsedOutput.length > 0 ? parsedOutput[0] : {};
          console.log('STS', stats);

          volumeDataArray[i].Stats = stats;
        }
      }
      console.log('NEW', volumeDataArray);

      res.locals.volumes = volumeDataArray;
      next();
    } catch (error) {
      const errorDetails = {
        log: 'Error in the volumeController.getAllVolumes catch',
        err: error,
        message: 'Error in the volumeController.getAllVolumes catch',
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
          log: 'error in the volumeController.getAllVolumes exec call',
          err: stderr,
          message: 'error in the volumeController.getAllVolumes exec call',
        };
        next(errorDetails);
      }
      const parsedOutput = stdout
        .trim()
        .split('\n')
        .map((item) => {
          const name = JSON.parse(item, undefined);
          return { name };
        });
      res.locals.volumesNames = parsedOutput;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the volumeController.getAllVolumesNames catch',
        err: error,
        message: 'error in the volumeController.getAllVolumesNames catch',
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
        'docker volume prune -a --force'
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the volumeController.deleteAll Volumes exec call',
          err: stderr,
          message: 'error in the volumeController.deleteAll Volumes exec call',
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split('\n');
      const deletedVolumesIndex = dataArray.findIndex(
        (item) => item === 'Deleted Volumes:'
      );
      const reclaimedSpaceIndex = dataArray.findIndex((item) =>
        item.startsWith('Total reclaimed space:')
      );

      const deletedVolumes = dataArray
        .slice(deletedVolumesIndex + 1, reclaimedSpaceIndex)
        .map((item) => item.trim())
        .filter((item) => item !== ''); // Filter out empty strings

      const reclaimedSpace = dataArray
        .slice(reclaimedSpaceIndex)
        .map((item) => item.trim());

      const output = [
        {
          'Deleted Volumes:': deletedVolumes,
          'Total reclaimed space:': reclaimedSpace,
        },
      ];
      res.locals.deletedVolumes = output;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the volumeController.deleteAllVolumes catch',
        err: error,
        message: 'error in the volumeController.deleteAllVolumes catch',
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
        'docker volume prune --force'
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the volumeController.deleteAllAnonymousVolumes',
          err: stderr,
          message: 'error in the volumeController.deleteAllAnonymousVolumes',
        };
        next(errorDetails);
      }

      const dataArray = stdout.trim().split('\n');
      const deletedVolumesIndex = dataArray.findIndex(
        (item) => item === 'Deleted Volumes:'
      );
      const reclaimedSpaceIndex = dataArray.findIndex((item) =>
        item.startsWith('Total reclaimed space:')
      );

      const deletedVolumes = dataArray
        .slice(deletedVolumesIndex + 1, reclaimedSpaceIndex)
        .map((item) => item.trim())
        .filter((item) => item !== ''); // Filter out empty strings

      const reclaimedSpace = dataArray
        .slice(reclaimedSpaceIndex)
        .map((item) => item.trim());

      const output = [
        {
          'Deleted Volumes:': deletedVolumes,
          'Total reclaimed space:': reclaimedSpace,
        },
      ];
      res.locals.deletedAnonymous = output;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the volumeController.deleteAllAnonymousVolumes catch',
        err: error,
        message:
          'error in the volumeController.deleteAllAnonymousVolumes catch',
      };
      next(errorDetails);
    }
  },

  volumeStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { volume } = req.body;
      const { stdout, stderr } = await promisifyExec(
        `docker ps --filter "volume=${volume}" --format "{{json . }}"`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the volumeController.volumeStats exec call',
          err: stderr,
          message: 'error in the volumeController.volumeStats exec call',
        };
        next(errorDetails);
      }
      const dataArray = stdout
        .trim()
        .split('\n')
        .map((item) => JSON.parse(item, undefined));
      res.locals.volumeStats = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'Input volume is not being used OR error in the volumeController.volumeStats catch',
        err: error,
        message:
          'Input volume is not being used OR error in the volumeController.volumeStats catch',
      };
      next(errorDetails);
    }
  },

  createVolume: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const { stdout, stderr } = await promisifyExec(
        `docker volume create ${name}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the volumeController.createVolume exec call',
          err: stderr,
          message: 'error in the volumeController.createVolume exec call',
        };
        next(errorDetails);
      }
      const output = stdout.trim();
      res.locals.createVolume = [{ message: output }];
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the volumeController.createVolume catch',
        err: error,
        message: 'error in the volumeController.createVolume catch',
      };
      next(errorDetails);
    }
  },

  deleteVolume: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const { stdout, stderr } = await promisifyExec(
        `docker volume rm ${name}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the volumeController.deleteVolume exec call',
          err: stderr,
          message: 'error in the volumeController.deleteVolume exec call',
        };
        next(errorDetails);
      }
      const output = stdout.trim();
      res.locals.deleteVolume = [{ message: output }];
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the volumeController.deleteVolume catch',
        err: error,
        message: 'error in the volumeController.deleteVolume catch',
      };
      next(errorDetails);
    }
  },
};

export default volumeController;
