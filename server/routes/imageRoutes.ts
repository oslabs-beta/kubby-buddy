import express, { Request, Response } from 'express';
import imageController from '../controllers/imageController';

//create router for image path
const imageRouter = express.Router();

//get route to retrieve all images
imageRouter.get(
	'/all-images',
	imageController.getAllImages,
	(_req: Request, res: Response) => {
		res.status(200).json(res.locals.images);
	}
);

//post route to run a single container from an image
imageRouter.post(
	'/run-images',
	imageController.runContainerFromImage,
	(_req: Request, res: Response) => {
		res.status(200).json(res.locals.ranContainer);
	}
);

//test route
imageRouter.use('/', (_req: Request, res: Response) => {
	res.send('imageRouter Test');
});

export default imageRouter;
