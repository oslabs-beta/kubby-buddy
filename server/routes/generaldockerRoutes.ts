import express, { Request, Response } from 'express'
import statsStreamController from '../controllers/statsStreamController'

const generalDockerRouter = express.Router()


generalDockerRouter.get('/stats', statsStreamController.getAllContainerStats)

generalDockerRouter.use('/', (_req: Request, res: Response) => {
    res.send('generalDockerRouter test')
})

export default generalDockerRouter
