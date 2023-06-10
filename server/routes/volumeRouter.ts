import express, { Request, Response } from "express"
import volumeController from "../controllers/volumeController"

const volumeRouter = express.Router()

volumeRouter.use('/', volumeController.getAllVolumes, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.volumes)
})

export default volumeRouter