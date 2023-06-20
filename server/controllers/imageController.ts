import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import { ImageController, ErrorDetails } from '../../types';
import { promisify } from 'node:util';
const promisifyExec = promisify(exec);

const imageController: ImageController = {
  getAllImages: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { stdout, stderr } = await promisifyExec(
        'docker images --format json'
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in exec of imageController.getAllImages',
          err: stderr,
          message: 'error in exec of imageController.getAllImages',
        };
        next(errorDetails);
      }
      const dataArray = stdout
        .trim()
        .split('\n')
        .map((item) => JSON.parse(item, undefined)); // Use undefined as the reviver
      res.locals.images = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in imageController.getAllImages catch',
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
    const { name, image, remove, volumeName, fileDirectory, port } = req.body;
    let rm;
    let vol;
    let portNum;

    // check if name and image is provided
    if (!name || !image || name.trim() === '' || image.trim() === '') {
      const errorDetails: ErrorDetails = {
        log: 'error in containerController.runContainerFromImage',
        err: null,
        message: 'Missing name or image fields',
      };
      return next(errorDetails);
    }

    // check if remove is provided
    if (remove === 'yes') {
      rm = '--rm';
    } else {
      rm = '';
    }

    // check if volume is provided
    if (volumeName && volumeName.trim() !== '') {
      // check if fileDirectory is provided
      if (fileDirectory && fileDirectory.trim() !== '') {
        vol = `-v ${volumeName}:${fileDirectory}`;
      } else {
        vol = `-v ${volumeName}:/App`;
      }
    } else {
      vol = '';
    }

    // check if port is provided
    if (port && port.trim() !== '') {
      try {
        const { stdout } = await promisifyExec(
          `docker inspect --format='{{.Config.ExposedPorts}}' ${image}`
        );
        const regex = /\[(\d+)\//;
        const match = stdout.match(regex);
        const result = match ? match[1] : null;
        portNum = `-p ${port}:${result}`;
      } catch (error) {
        const errorDetails: ErrorDetails = {
          log: 'error in imageController.runContainerFromImage PORT catch',
          err: error,
          message: `error in exec of imageController.runContainerFromImage PORT catch`,
        };
        next(errorDetails);
      }
    } else {
      portNum = '';
    }

    try {
      const { stdout, stderr } = await promisifyExec(
        `docker run -d ${rm} ${vol} ${portNum} --name ${name} ${image}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the imageController.runContainerFromImage exec',
          err: stderr,
          message: 'error in the imageController.runContainerFromImage exec',
        };
        next(errorDetails);
      }
      const output = stdout.trim();
      res.locals.ranContainer = [{ message: output }];
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in imageController.runContainerFromImage catch',
        err: error,
        message: `error in exec of imageController.runContainerFromImage catch`,
      };
      next(errorDetails);
    }
  },

  // runContainerFromImage: async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   const { name, image } = req.body;
  //   try {
  //     const { stdout, stderr } = await promisifyExec(
  //       `docker run -d --name ${name} ${image}`
  //     );
  //     if (stderr) {
  //       const errorDetails: ErrorDetails = {
  //         log: 'error in the imageController.runContainerFromImage exec',
  //         err: stderr,
  //         message: 'error in the imageController.runContainerFromImage exec',
  //       };
  //       next(errorDetails);
  //     }
  //     const output = stdout.trim();
  //     res.locals.ranContainer = [{ message: output }];
  //     next();
  //   } catch (error) {
  //     const errorDetails: ErrorDetails = {
  //       log: 'error in imageController.runContainerFromImage catch',
  //       err: error,
  //       message: `error in exec of imageController.runContainerFromImage catch`,
  //     };
  //     next(errorDetails);
  //   }
  // },

  // // run container with remove when it stops
  // runContainerFromImageWithRemove: async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   const { name, image } = req.body;
  //   try {
  //     const { stdout, stderr } = await promisifyExec(
  //       `docker run -d --rm --name ${name} ${image}`
  //     );
  //     if (stderr) {
  //       const errorDetails: ErrorDetails = {
  //         log: 'error in the imageController.runContainerFromImage exec',
  //         err: stderr,
  //         message: 'error in the imageController.runContainerFromImage exec',
  //       };
  //       next(errorDetails);
  //     }
  //     res.locals.ranContainerWithRemove = [{ message: stdout.trim() }];
  //     next();
  //   } catch (error) {
  //     const errorDetails: ErrorDetails = {
  //       log: 'error in imageController.runContainerFromImageWithRemove catch',
  //       err: error,
  //       message: `error in exec of imageController.runContainerFromImageWithRemove catch`,
  //     };
  //     next(errorDetails);
  //   }
  // },

  // // run container with named volume
  // runContainerFromImageWithNamedVolume: async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   const { name, image, volumeName, fileDirectory } = req.body;
  //   try {
  //     const { stdout, stderr } = await promisifyExec(
  //       `docker run -d --name ${name} -v ${volumeName}:${fileDirectory} ${image}`
  //     );
  //     if (stderr) {
  //       const errorDetails: ErrorDetails = {
  //         log: 'error in the imageController.runContainerFromImageWithNamedVolume exec',
  //         err: stderr,
  //         message:
  //           'error in the imageController.runContainerFromImageWithNamedVolume exec',
  //       };
  //       next(errorDetails);
  //     }
  //     res.locals.ranContainerFromImageWithNamedVolume = [
  //       { message: stdout.trim() },
  //     ];
  //     next();
  //   } catch (error) {
  //     const errorDetails: ErrorDetails = {
  //       log: 'error in imageController.unContainerFromImageWithNamedVolume catch',
  //       err: error,
  //       message: `error in exec of imageController.unContainerFromImageWithNamedVolume catch`,
  //     };
  //     next(errorDetails);
  //   }
  // },

  // // run container with named volume and remove
  // runContainerFromImageWithNamedVolumeAndRemove: async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   const { name, image, volumeName, fileDirectory } = req.body;
  //   try {
  //     const { stdout, stderr } = await promisifyExec(
  //       `docker run -d --rm --name ${name} -v ${volumeName}:${fileDirectory} ${image}`
  //     );
  //     if (stderr) {
  //       const errorDetails: ErrorDetails = {
  //         log: 'error in the imageController.runContainerFromImageWithNamedVolumeAndRemove exec',
  //         err: stderr,
  //         message:
  //           'error in the imageController.runContainerFromImageWithNamedVolumeAndRemove exec',
  //       };
  //       next(errorDetails);
  //     }
  //     res.locals.ranContainerFromImageWithNamedVolumeAndRemove = [
  //       { message: stdout.trim() },
  //     ];
  //     next();
  //   } catch (error) {
  //     const errorDetails: ErrorDetails = {
  //       log: 'error in imageController.runContainerFromImageWithNamedVolumeAndRemove catch',
  //       err: error,
  //       message: `error in exec of imageController.runContainerFromImageWithNamedVolumeAndRemove catch`,
  //     };
  //     next(errorDetails);
  //   }
  // },

  // prune unused images (ones not actively connected with a container)
  pruneUnusedImages: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { stdout, stderr } = await promisifyExec(
        'docker image prune -a --force'
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the exec of imageController.pruneUnusedImages',
          err: stderr,
          message: 'error in the exec of imageController.pruneUnusedImages',
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split('\n');
      res.locals.output = dataArray;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the imageController.pruneUnusedImages catch',
        err: error,
        message: 'error in the imageController.pruneUnusedImages catch',
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
        'docker image prune --force'
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the exec of imageController.pruneDanglingImages',
          err: stderr,
          message: 'error in the exec of imageController.pruneDanglingImages',
        };
        next(errorDetails);
      }
      const dataArray = stdout.trim().split('\n');
      const deletedImagesIndex = dataArray.findIndex(
        (item) => item === 'Deleted Images:'
      );
      const reclaimedSpaceIndex = dataArray.findIndex((item) =>
        item.startsWith('Total reclaimed space:')
      );

      const deletedImages = dataArray
        .slice(deletedImagesIndex + 1, reclaimedSpaceIndex)
        .map((item) => item.trim())
        .filter((item) => item !== ''); // Filter out empty strings

      const reclaimedSpace = dataArray
        .slice(reclaimedSpaceIndex)
        .map((item) => item.trim());

      const output = [
        {
          'Deleted Images:': deletedImages,
          'Total reclaimed space:': reclaimedSpace,
        },
      ];

      res.locals.output = output;
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the imageController.pruneDanglingImages catch',
        err: error,
        message: 'error in the imageController.pruneDanglingImages catch',
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
      const dataArray = stdout.trim().split('\n');
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
