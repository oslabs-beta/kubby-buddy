import { Request, Response, NextFunction } from 'express';
import { exec } from 'node:child_process';

const volumeController = {
	getAllVolumes: async (_req: Request, res: Response, next: NextFunction) => {
		try {
			await exec('docker volume ls', (error, stdout, _stderr) => {
				if (error) {
					next({
						log: 'error in the volumeController.getAllVolumes exec call',
						message: error,
					});
				}
				res.locals.volumes = stdout;
				next();
			});
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
		_res: Response,
		next: NextFunction
	) => {
		try {
			// await exec('docker volume prune', (error, _stdout, _stderr) => {
			//     if (error) {
			//         next({
			//             log: 'error in the volumeController.deleteAll Volumes exec call',
			//             message: error
			//         })
			//     }
			//     if (_stdout) {
			//         try {
			//             exec('y', (error, stdout, _stderr) => {
			//                 if (error) {
			//                     next({
			//                         log: 'error in exec, in exec of deleteAllVolumes',
			//                         err: error
			//                     })
			//                 }
			//                 res.locals.deleted = stdout
			//                 next()
			//             })
			//          }
			//         catch (error) {
			//             next({
			//                 log: 'error in second try block in deleteAllVolumes',
			//                 err: error
			//             })
			//         }
			//     }
			// })
		} catch (error) {
			next({
				log: 'error in the volumeController.deleteAllVolumes middleware',
				message: error,
			});
		}
	},
};

export default volumeController;
