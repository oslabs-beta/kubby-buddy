import express, { Request, Response, Router } from "express";
import imageController from "../controllers/imageController";

//create router for image path
const imageRouter: Router = express.Router();

//get route to retrieve all images
//INPUT: nothing
//OUTPUT: array of objects
imageRouter.get(
  "/all-images",
  imageController.getAllImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.images);
  }
);

//post route to run a single container from an image
//INPUT: array of object with name and image value, [{"name": "mongodb", "image": "mongo"}]
//OUTPUT: json array of running container
//other tests: container actually runs... maybe you can use another route to test?
imageRouter.post(
  "/run-images",
  imageController.runContainerFromImage,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainer);
  }
);

//post route to run a container from an image with container removal
//INPUT: array of object with name and image value, [{"name": "mongodb", "image": "mongo"}]
//OUTPUT: json array of running container
//other tests: container actually runs... maybe you can use another route to test?
imageRouter.post(
  "/run-images-with-remove",
  imageController.runContainerFromImageWithRemove,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainerWithRemove);
  }
);

//INPUT: nothing
//OUTPUT: array... this needs to be refactored to put out an array of objects
//prune all unused images (ones not acively connected witha container)

imageRouter.delete(
  "/prune-all-unused",
  imageController.pruneUnusedImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.output);
  }
);

//INPUT: nothing
//OUTPUT: array... this needs to be refactored to put out an array of objects
//prune only dangling images (ones without a tag/name)

imageRouter.delete(
  "/prune-dangling",
  imageController.pruneDanglingImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.output);
  }
);

//INPUT: nothing
//OUTPUT: array... this needs to be refactored to put out an array of objects
// remove image by name

imageRouter.delete(
  "/remove-image-by-name",
  imageController.removeSingleImage,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.output);
  }
);
//test route
imageRouter.use("/", (_req: Request, res: Response) => {
  res.send("imageRouter Test");
});

export default imageRouter;
