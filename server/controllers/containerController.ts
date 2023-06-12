import { Request, Response, NextFunction } from 'express';
import { exec } from 'node:child_process';

const containerController = {
	//middleware to run CLI command to get list of active containers

	getAllRunningContainers: async (
		_req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			await exec('docker ps --format json', (error, stdout, _stderr) => {
				if (error) {
					next({
						log: 'error in the exec call in containerController.getAllRunningContainers',
						err: error,
					});
				}
				res.locals.containers = stdout;
				next();
			});
		} catch (error) {
			next({
				log: 'error in the containerController.getAllRunningContainers',
				err: error,
			});
		}
	},

	// get active container names
	getAllRunningContainersNames: async (
		_req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			await exec(
				`docker container ls --format='{{json .Names}}'`,
				(error, stdout, _stderr) => {
					if (error) {
						next({
							log: 'error in the exec call in containerController.getAllRunningContainers',
							err: error,
						});
					}
					res.locals.containersNames = stdout;
					next();
				}
			);
		} catch (error) {
			next({
				log: 'error in the containerController.getAllRunningContainers',
				err: error,
			});
		}
	},

	//middleware to stop a specific container

	stopASpecificContainer: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		console.log('stop');
		const { name } = req.body;
		try {
			await exec(`docker stop ${name}`, (error, stdout, _stderr) => {
				console.log('exec');

				if (error) {
					next({
						log: 'error in the containerController.stopASpecificContainer exec',
						message: error,
					});
				}
				res.locals.stoppedContainer = stdout;
				next();
			});
		} catch (error) {
			next({
				log: `error in the containerController.stopASpecificContainer catch`,
				err: error,
			});
		}
	},

	//middleware to start a specific container

	startASpecificContainer: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { name } = req.body;
		try {
			await exec(`docker start ${name}`, (error, stdout, stderr) => {
				if (error) {
					next({
						log: `error in the containerController.startASpecificContainer exec`,
						err: error,
					});
				}
				console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.locals.startedContainer = stdout
        next();
			});
			
		} catch (error) {
			next({
				log: `error in the containerController.startASpecificContainer`,
				err: error,
			});
		}
	},

	//middleware to prune all stopped containers

	pruneStoppedContainers: async (
		_req: Request,
		res: Response,
		next: NextFunction
	) => {
		console.log('prune');
		try {
			await exec(`docker container prune --force`, (error, stdout, _stderr) => {
				if (error) {
					console.log('error');

					next({
						log: `error in the containerController.pruneStoppedContainers exec`,
					});
				}
				//checking for deleted containers ids
				res.locals.deletedContainers = stdout
				next();
			});
		} catch (error) {
			next({
				log: `error in the containerController.pruneStoppedContainers catch`,
				err: error,
			});
		}
	},

	//get log for a specific container

	getSpecificLog: async (req: Request, res: Response, next: NextFunction) => {
		console.log(req.query);
		const { name } = req.query;
		try {
			await exec(`docker container logs ${name}`, (error, stdout, _stderr) => {
				if (error) {
					return next({
						log: `error in the containerController.getSpecificLog`,
						err: error,
					});
				}
				res.locals.log = stdout;
				next();
			});
		} catch (error) {
			next({
				log: `error in the containerController.getSpecificLog catch`,
				err: error,
			});
		}
	},
};

export default containerController;
