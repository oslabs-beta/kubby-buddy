import express, { Request, Response } from "express";
import volumeController from "../controllers/volumeController";

const volumeRouter = express.Router();

volumeRouter.get(
  "/all-volumes",
  volumeController.getAllVolumes,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.volumes);
  }
);

// get volume names
volumeRouter.get(
  "/all-volumes-names",
  volumeController.getAllVolumesNames,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.volumesNames);
  }
);

volumeRouter.delete(
	'/all-volumes',
	volumeController.deleteAllVolumes,
	(_req: Request, res: Response) => {
		res.status(200).json(res.locals.deletedVolumes)
	}
);

volumeRouter.delete('/all-anonymous-volumes', volumeController.deleteAllAnonymousVolumes, (_req: Request, res: Response) => {
	res.status(200).json(res.locals.deletedAnonymous)
})
export default volumeRouter;
