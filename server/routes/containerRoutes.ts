import express, { Request, Response } from 'express'
import containerController from '../controllers/containerController'

const containerRouter = express.Router()




containerRouter.get('/all-active-containers', containerController.getAllRunningContainers, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.containers)
})

containerRouter.use('/start', (_req: Request, res: Response) => {
    res.send('start test worked')
})

containerRouter.use('/stop', (_req: Request, res: Response) => {
    res.send('stop test worked')
})

containerRouter.use('/', (_req: Request, res: Response) => {
    res.send('containerRouter test')
})




    
export default containerRouter