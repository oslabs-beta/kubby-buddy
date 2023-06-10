import { Request, Response, NextFunction } from "express"
import { exec } from "node:child_process"

const volumeController = {

    getAllVolumes: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            await exec('docker volume ls', (error, stdout, _stderr) => {
                if (error) {
                    next({
                        log: 'error in the volumeController.getAllVolumes exec call',
                        message: error
                    })
                }
                res.locals.volumes = stdout
                next()
            })
        }
        catch (error) {
            next({
                log: 'error in the volumeController.getAllVolumes middleware',
                message: error
            })
        }
    }
}

export default volumeController