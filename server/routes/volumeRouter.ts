import express, { Request, Response } from "express"
import volumeController from "../controllers/volumeController"

const volumeRouter = express.Router()

volumeRouter.get('/all-volumes', volumeController.getAllVolumes, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.volumes)
})

volumeRouter.delete('/all-volumes', volumeController.deleteAllVolumes, (_req: Request, res: Response) => {
    res.status(200).json('res.locals.deleted')
})
export default volumeRouter