import express, { Request, Response, Router } from 'express';
import imageController from '../controllers/imageController';
import postgresController from '../controllers/postgresController';

// create router for image path
const imageRouter: Router = express.Router();

// get route to retrieve all images
// INPUT: nothing
// OUTPUT: array of objects [{},{}]
imageRouter.get(
  '/all-images',
  imageController.getAllImages,
  postgresController.grabImageStats,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals);
  }
);

/**
// post route to run a single container from an image
// INPUT: object with name, image, value, remove, volumeName, fileDirectory, port values 
  {"name": "container1", "image": "mongo", "remove": "yes", "volumeName": "vol1", "fileDirectory": "/App", "port": "3000"}
// OUTPUT: array of object containing ID of container [{"message": "cf29432706cdabfd550b37561311d8f56fe18c8de25ae0f1069d501900ecc49a"}]
*/

imageRouter.post(
  '/run-images',
  imageController.runContainerFromImage,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainer);
  }
);

/**
// delete all unused images (ones not acively connected with a container)
// INPUT: nothing
// OUTPUT: array of objects containing property and array of values 
// [{ "Deleted images:": ["deleted: sha256:dd6675b5cfea17abb655ea8229cbcfa5db9d0b041f839db0c24228c2e18a4bdf"], "Total reclaimed space:": ["Total reclaimed space: 305MB"]}]
 */
imageRouter.delete(
  '/prune-all-unused',
  imageController.pruneUnusedImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.output);
  }
);

// remove image by name
// INPUT: nothing
// OUTPUT: array of object [{"Deleted": ["Untagged: image1:latest", "Deleted: sha256:df9e5deb1141fdaefa168a9a90e7936e09589b6ca6cd0fd6f7d564a9a45ec5ed"]}]
imageRouter.delete(
  '/remove-image-by-name',
  imageController.removeSingleImage,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.output);
  }
);

//test route
imageRouter.use('/', (_req: Request, res: Response) => {
  res.send('imageRouter Test');
});

export default imageRouter;
