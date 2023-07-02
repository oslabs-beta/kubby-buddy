import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import { ImageController, ErrorDetails } from '../../types';
import { promisify } from 'node:util';
const promisifyExec = promisify(exec);

export const cmdGetAllImages: string = `docker images --format json`;
export const cmdRunContainerFromImageName: string = `--name `;
export const cmdRunContainerFromImage: string = `docker run -d`;
export const cmdPruneUnusedImages: string = `docker image prune -a --force`;
export const cmdRemoveSingleImage: string = `docker image rm `;

export function parseOutputContainers(data: string | Buffer) {
  const parsedOutput = data
    .toString()
    .trim()
    .split('\n')
    .map((item) => JSON.parse(item, undefined));

  return parsedOutput;
}

export function parseOutputGetAllImages(data: string | Buffer) {
  const parsedOutput = data
    .toString()
    .trim()
    .split('\n')
    .map((item) => JSON.parse(item, undefined));

  return parsedOutput;
}

export function setRmOption(remove: string) {
  let rm;
  // check if remove is provided
  if (remove === 'yes') {
    rm = '--rm';
  } else {
    rm = '';
  }
  return rm;
}

export function setVolOption(volumeName: string, fileDirectory: string) {
  let vol;
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
  return vol;
}

export async function getPortMapping(port: string, image: string) {
  let portNum = '';

  if (port && port.trim() !== '') {
    const { stdout, stderr } = await promisifyExec(
      `docker inspect --format='{{.Config.ExposedPorts}}' ${image}`
    );

    if (stderr) {
      throw new Error(
        'Error in imageController.runContainerFromImage PORT exec call'
      );
    }

    const regex = /\[(\d+)\//;
    const match = stdout.match(regex);
    const result = match ? match[1] : null;
    if (result === null) {
      portNum = ``;
    } else {
      portNum = `-p ${port}:${result}`;
    }
  }

  return portNum;
}

export function parseOutputrunContainerFromImage(stdout: string | Buffer) {
  const output = stdout.toString().trim();
  return [{ message: output }];
}

export function parseOutputPruneUnusedImages(stdout: string | Buffer) {
  const data = stdout.toString().trim();
  const dataArray = data.split('\n');
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

  return output;
}

export function parseOutputRemoveSingleImage(stdout: string | Buffer) {
  const dataArray = stdout.toString().trim().split('\n');
  return [{ Deleted: dataArray }];
}

export const imageController: ImageController = {
  getAllImages: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { stdout, stderr } = await promisifyExec(cmdGetAllImages);
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in exec of imageController.getAllImages',
          err: stderr,
          message: 'error in exec of imageController.getAllImages',
        };
        next(errorDetails);
      }
      res.locals.images = parseOutputGetAllImages(stdout);
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

    // let portNum;

    // // check if name and image is provided
    // if (!name || !image || name.trim() === '' || image.trim() === '') {
    //   const errorDetails: ErrorDetails = {
    //     log: 'error in containerController.runContainerFromImage',
    //     err: null,
    //     message: 'Missing name or image fields',
    //   };
    //   return next(errorDetails);
    // }
    // let rm;
    // let vol;
    // check if remove is provided
    // if (remove === 'yes') {
    //   rm = '--rm';
    // } else {
    //   rm = '';
    // }

    // check if volume is provided
    // if (volumeName && volumeName.trim() !== '') {
    //   // check if fileDirectory is provided
    //   if (fileDirectory && fileDirectory.trim() !== '') {
    //     vol = `-v ${volumeName}:${fileDirectory}`;
    //   } else {
    //     vol = `-v ${volumeName}:/App`;
    //   }
    // } else {
    //   vol = '';
    // }

    // check if port is provided
    // if (port && port.trim() !== '') {
    //   try {
    //     const { stdout } = await promisifyExec(
    //       `docker inspect --format='{{.Config.ExposedPorts}}' ${image}`
    //     );
    //     const regex = /\[(\d+)\//;
    //     const match = stdout.match(regex);
    //     const result = match ? match[1] : null;
    //     portNum = `-p ${port}:${result}`;
    //   } catch (error) {
    //     const errorDetails: ErrorDetails = {
    //       log: 'error in imageController.runContainerFromImage PORT catch',
    //       err: error,
    //       message: `error in exec of imageController.runContainerFromImage PORT catch`,
    //     };
    //     next(errorDetails);
    //   }
    // } else {
    //   portNum = '';
    // }

    try {
      const portMapping = await getPortMapping(port, image); // Await the result of getPortMapping
      console.log(
        `${cmdRunContainerFromImage} ${setRmOption(remove)} ${setVolOption(
          volumeName,
          fileDirectory
        )} ${portMapping} ${cmdRunContainerFromImageName} ${name} ${image}`
      );
      const { stdout, stderr } = await promisifyExec(
        `${cmdRunContainerFromImage} ${setRmOption(remove)} ${setVolOption(
          volumeName,
          fileDirectory
        )} ${portMapping} ${cmdRunContainerFromImageName} ${name} ${image}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the imageController.runContainerFromImage exec',
          err: stderr,
          message: 'error in the imageController.runContainerFromImage exec',
        };
        next(errorDetails);
      }
      res.locals.ranContainer = parseOutputrunContainerFromImage(stdout);
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
      const { stdout, stderr } = await promisifyExec(cmdPruneUnusedImages);
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: 'error in the exec of imageController.pruneUnusedImages',
          err: stderr,
          message: 'error in the exec of imageController.pruneUnusedImages',
        };
        next(errorDetails);
      }
      // const dataArray = stdout.trim().split('\n');
      // const deletedImagesIndex = dataArray.findIndex(
      //   (item) => item === 'Deleted Images:'
      // );
      // const reclaimedSpaceIndex = dataArray.findIndex((item) =>
      //   item.startsWith('Total reclaimed space:')
      // );

      // const deletedImages = dataArray
      //   .slice(deletedImagesIndex + 1, reclaimedSpaceIndex)
      //   .map((item) => item.trim())
      //   .filter((item) => item !== ''); // Filter out empty strings

      // const reclaimedSpace = dataArray
      //   .slice(reclaimedSpaceIndex)
      //   .map((item) => item.trim());

      // const output = [
      //   {
      //     'Deleted Images:': deletedImages,
      //     'Total reclaimed space:': reclaimedSpace,
      //   },
      // ];

      res.locals.output = parseOutputPruneUnusedImages(stdout);
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

  // //prune only dangling images (ones without a tag)
  // pruneDanglingImages: async (
  //   _req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     const { stdout, stderr } = await promisifyExec(
  //       'docker image prune --force'
  //     );
  //     if (stderr) {
  //       const errorDetails: ErrorDetails = {
  //         log: 'error in the exec of imageController.pruneDanglingImages',
  //         err: stderr,
  //         message: 'error in the exec of imageController.pruneDanglingImages',
  //       };
  //       next(errorDetails);
  //     }
  //     const dataArray = stdout.trim().split('\n');
  //     const deletedImagesIndex = dataArray.findIndex(
  //       (item) => item === 'Deleted Images:'
  //     );
  //     const reclaimedSpaceIndex = dataArray.findIndex((item) =>
  //       item.startsWith('Total reclaimed space:')
  //     );

  //     const deletedImages = dataArray
  //       .slice(deletedImagesIndex + 1, reclaimedSpaceIndex)
  //       .map((item) => item.trim())
  //       .filter((item) => item !== ''); // Filter out empty strings

  //     const reclaimedSpace = dataArray
  //       .slice(reclaimedSpaceIndex)
  //       .map((item) => item.trim());

  //     const output = [
  //       {
  //         'Deleted Images:': deletedImages,
  //         'Total reclaimed space:': reclaimedSpace,
  //       },
  //     ];

  //     res.locals.output = output;
  //     next();
  //   } catch (error) {
  //     const errorDetails: ErrorDetails = {
  //       log: 'error in the imageController.pruneDanglingImages catch',
  //       err: error,
  //       message: 'error in the imageController.pruneDanglingImages catch',
  //     };
  //     next(errorDetails);
  //   }
  // },

  //remove single image

  removeSingleImage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.body;
    try {
      const { stdout, stderr } = await promisifyExec(
        `${cmdRemoveSingleImage} ${id}`
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: `error in the imageController.removeSingleImage exec for ${id}`,
          err: stderr,
          message: `error in the imageController.removeSingleImage exec for ${id}`,
        };
        next(errorDetails);
      }
      res.locals.output = parseOutputRemoveSingleImage(stdout);
      next();
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: `error in the imageController.removeSingleImage in the catch for ${id}`,
        err: error,
        message: `error in the imageController.removeSingleImage catch for ${id}`,
      };
      next(errorDetails);
    }
  },
};

export default imageController;
