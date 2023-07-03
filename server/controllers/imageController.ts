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

interface ParseOutputGetAllImages {
  Repository: string;
}

interface ParseOutputContainers {
  message: string;
  Image: string;
  LocalVolumes: string;
  Mounts: string;
  Names: string;
  Ports: string;
}

interface ParseOutputPruneUnusedImages {
  'Deleted Images:': string[];
  'Total reclaimed space:': string[];
}

interface ParseOutputRemoveSingleImage {
  Deleted: string[];
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

export function parseOutputGetAllImages(
  data: string | Buffer
): ParseOutputGetAllImages[] {
  const parsedOutput = data
    .toString()
    .trim()
    .split('\n')
    .map((item) => JSON.parse(item, undefined));

  return parsedOutput;
}

export function setRmOption(remove: string): string {
  let rm;
  // check if remove is provided
  if (remove === 'yes') {
    rm = '--rm';
  } else {
    rm = '';
  }
  return rm;
}

export function setVolOption(
  volumeName: string,
  fileDirectory: string
): string {
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

export async function getPortMapping(
  port: string,
  image: string
): Promise<string> {
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

export function parseOutputrunContainerFromImage(
  stdout: string | Buffer
): Array<{}> {
  const output = stdout.toString().trim();
  return [{ message: output }];
}

export function parseOutputPruneUnusedImages(
  stdout: string | Buffer
): ParseOutputPruneUnusedImages[] {
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

export function parseOutputRemoveSingleImage(
  stdout: string | Buffer
): ParseOutputRemoveSingleImage[] {
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
