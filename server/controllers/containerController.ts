import { Request, Response, NextFunction } from 'express'
import { exec } from 'node:child_process'

const containerController = {
    getAllRunningContainers: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            await exec('docker ps', (error, stdout, _stderr) => {
                if (error) {
                    next({
                        log: 'error in the exec call in containerController.getAllRunningContainers',
                        err: error
                    })
                }
                res.locals.containers = stdout
                next()
            })

        }
        catch (error) {
            next({
                log: 'error in the containerController.getAllRunningContainers',
                err: error
            })
        }
    }
}

export default containerController