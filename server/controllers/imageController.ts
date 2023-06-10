import { Request, Response, NextFunction } from 'express';
import { exec } from 'node:child_process';

const imageController = {
	getAllImages: async (_req: Request, res: Response, next: NextFunction) => {
		try {
			await exec('docker images', (error, stdout, _stderr) => {
				if (error) {
					next({
						log: 'error in exec of imageController.getAllImages',
						err: error,
					});
				}
				res.locals.images = stdout;
				next();
			});
		} catch (error) {
			next({
				log: 'error in imageController.getAllImages',
				err: error,
			});
		}
	},

	runContainerFromImage: async (
		req: Request,
		_res: Response,
		next: NextFunction
	) => {
		const { name, image } = req.body;
		try {
			await exec(
				`docker run -d --name ${name} ${image}`,
				(error, _stdout, _stderr) => {
					if (error) {
						next({
							log: 'error in the imageController.runContainerFromImage exec',
							err: error,
						});
					}
					next();
				}
			);
		} catch (error) {
			next({
				log: 'error in the imageController.runContainerFromImage middleware',
				err: error,
			});
		}
	},
};

export default imageController;
