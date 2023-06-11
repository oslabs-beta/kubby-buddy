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
			await exec('docker ps', (error, stdout, _stderr) => {
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

	//middleware to stop a specific container

	stopASpecificContainer: async (req: Request, _res: Response, next: NextFunction) => {
		const { name } = req.body
		try {
			const result = await exec(`docker stop ${name}`, (error, stdout, _stderr) => {
				if (error) {
					next({
						log: 'error in the containerController.stopASpecificContainer exec',
						message: error
					})
				}
				return stdout
			})
			next()
		}
		catch (error) {

		}
	}
};

export default containerController;
