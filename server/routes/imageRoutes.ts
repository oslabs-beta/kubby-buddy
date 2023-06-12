import express, { Request, Response, Router } from "express";
import imageController from "../controllers/imageController";

//create router for image path
const imageRouter: Router = express.Router();

//get route to retrieve all images
imageRouter.get(
  "/all-images",
  imageController.getAllImages,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.images);
  }
);

//post route to run a single container from an image
imageRouter.post(
  "/run-images",
  imageController.runContainerFromImage,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainer);
  }
);

//post route to run a continer from an image with container removal
imageRouter.post(
  "/run-images-with-remove",
  imageController.runContainerFromImageWithRemove,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.ranContainerWithRemove);
  }
);

//delete an image
imageRouter.delete(
  "/delete",
  imageController.deleteImage,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.imagesDeleted);
  }
);

//test route
imageRouter.use("/", (_req: Request, res: Response) => {
  res.send("imageRouter Test");
});

export default imageRouter;
