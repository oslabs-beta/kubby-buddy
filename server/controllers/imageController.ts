import { Request, Response, NextFunction } from "express"
import { exec } from "node:child_process"

const imageController = {
    getAllImages: async (_req: Request, res: Response, next: NextFunction) => {
        
        try {
            await exec('docker images', (error, stdout, _stderr) => {
                if (error) {
                    next({
                        log: 'error in exec of imageController.getAllImages',
                        err: error
                    })
                }
                res.locals.images = stdout
                next()
            })
        } catch (error) {
            next({
                log: 'error in imageController.getAllImages',
                err: error
            })
        }
        
    }
}

export default imageController