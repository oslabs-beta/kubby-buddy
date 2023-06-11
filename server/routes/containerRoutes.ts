import express, { Request, Response } from 'express';
import containerController from '../controllers/containerController';

const containerRouter = express.Router();

//get info about all active ontainers

containerRouter.get(
	'/all-active-containers',
	containerController.getAllRunningContainers,
	(_req: Request, res: Response) => {
		res.status(200).json(res.locals.containers);
	}
);

//stop a specific container

containerRouter.post('/stop', containerController.stopASpecificContainer, (_req: Request, res: Response) => {
	res.status(200).json('stop test worked');
});

containerRouter.use('/start', (_req: Request, res: Response) => {
	res.send('start test worked');
});


containerRouter.use('/', (_req: Request, res: Response) => {
	res.send('containerRouter test');
});

export default containerRouter;
