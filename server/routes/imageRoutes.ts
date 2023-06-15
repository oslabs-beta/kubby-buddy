import express, { Request, Response, Router } from "express";
import imageController from "../controllers/imageController";

// create router for image path
const imageRouter: Router = express.Router();

// get route to retrieve all images
// INPUT: nothing
// OUTPUT: array of objects [{},{}]
imageRouter.get(
  "/all-images",
  imageController.getAllImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.images);
  }
);

// post route to run a single container from an image
// INPUT: object with name and image value, {"name": "mongodb", "image": "mongo"}
// OUTPUT: array of object containing ID of container [{"message": "cf29432706cdabfd550b37561311d8f56fe18c8de25ae0f1069d501900ecc49a"}]
// other tests: container actually runs... maybe you can use another route to test?
imageRouter.post(
  "/run-images",
  imageController.runContainerFromImage,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainer);
  }
);

// post route to run a container from an image with container removal
// INPUT: object with name and image value, {"name": "mongodb", "image": "mongo"}
// OUTPUT: array of object containing ID of container [{"message": "cf29432706cdabfd550b37561311d8f56fe18c8de25ae0f1069d501900ecc49a"}]
// other tests: container actually runs... maybe you can use another route to test?
imageRouter.post(
  "/run-images-with-remove",
  imageController.runContainerFromImageWithRemove,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainerWithRemove);
  }
);

// post route to run a container from an image that creates named volume
// INPUT: object with name, image, volumeName, fileDirectory, {"name": "mongodb", "image": "mongo", "volumeName": "vol1", "fileDirectory": "/App"}
// OUTPUT: array of object that has message with value of running container, [{"message": "fbc113b8031af3560c77f023ea7fce22a8f7ff3c5c958b3b9c158956fb8e85ed"}]
imageRouter.post(
  "/run-images-with-named-volume",
  imageController.runContainerFromImageWithNamedVolume,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainerFromImageWithNamedVolume);
  }
);

// delete all unused images (ones not acively connected with a container)
// INPUT: nothing
// OUTPUT: Not finalized: WORK IN PROGRESS
imageRouter.delete(
  "/prune-all-unused",
  imageController.pruneUnusedImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.output);
  }
);

// delete only dangling images (ones without a tag/name)
// INPUT: nothing
// OUTPUT: Not finalized: WORK IN PROGRESS
imageRouter.delete(
  "/prune-dangling",
  imageController.pruneDanglingImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.output);
  }
);

// remove image by name
// INPUT: nothing
// OUTPUT: Not finalized: WORK IN PROGRESS
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
