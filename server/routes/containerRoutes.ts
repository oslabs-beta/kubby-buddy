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
	res.status(200).json('stop route complete');
});

//start a specific container

containerRouter.post('/start', containerController.startASpecificContainer,(_req: Request, res: Response) => {
	res.status(200).json('start route complete');
});

//prune all stopped containers

containerRouter.delete('/prune-stopped-containers', containerController.pruneStoppedContainers, (_req: Request, res: Response) => {
	res.status(200).json('prune-container route')
})

containerRouter.use('/', (_req: Request, res: Response) => {
	res.send('containerRouter test');
});

export default containerRouter;
