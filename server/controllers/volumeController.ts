import { Request, Response, NextFunction } from 'express';
import { exec } from 'node:child_process';
import { VolumeController, ErrorDetails } from '../../types';
import { promisify } from 'node:util';
const promisifyExec = promisify(exec);

const volumeController: VolumeController = {
	getAllVolumes: async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const { stdout, stderr } = await promisifyExec(
				'docker volume ls --format json'
			);
			if (stderr) {
				const errorDetails: ErrorDetails = {
					log: 'error in the volumeController.getAllVolumes exec call',
					err: stderr,
					message: 'error in the volumeController.getAllVolumes exec call',
				};
				next(errorDetails);
			}
			res.locals.volumes = stdout;
			next();
		} catch (error) {
			next({
				log: 'error in the volumeController.getAllVolumes middleware',
				message: error,
			});
		}
	},

	// get volume names
	getAllVolumesNames: async (
		_req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { stdout, stderr } = await promisifyExec(
				`docker volume ls --format='{{json .Name}}'`
			);
			if (stderr) {
				const errorDetails: ErrorDetails = {
					log: 'error in the volumeController.getAllVolumes exec call',
					err: stderr,
					message: 'error in the volumeController.getAllVolumes exec call',
				};
				next(errorDetails);
			}
			res.locals.volumesNames = stdout;
			next();
		} catch (error) {
			next({
				log: 'error in the volumeController.getAllVolumes middleware',
				message: error,
			});
		}
	},

	//there's a work around for mac, but not sure about windows
	deleteAllVolumes: async (
		_req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { stdout, stderr } = await promisifyExec(
				'docker volume prune -a --force'
			);
			if (stderr) {
				const errorDetails: ErrorDetails = {
					log: 'error in the volumeController.deleteAll Volumes exec call',
					err: stderr,
					message: 'error in the volumeController.deleteAll Volumes exec call',
				};
				next(errorDetails);
			}
			res.locals.deletedVolumes = stdout.trim();
			next();
		} catch (error) {
			next({
				log: 'error in the volumeController.deleteAllVolumes middleware',
				message: error,
			});
		}
	},

	deleteAllAnonymousVolumes: async (
		_req: Request,
		res: Response,
		next: NextFunction
	) => {
		console.log('delete');
		try {
			await exec('docker volume prune --force', (error, stdout, _stderr) => {
				if (error) {
					next({
						log: 'volumeController',
						err: error,
					});
				}
				res.locals.deletedAnonymous = stdout.trim();
				next();
			});
		} catch (error) {
			next({
				log: 'error in the volumeController.deleteAllAnonymousVolumes',
				message: error,
			});
		}
	},
};

export default volumeController;
