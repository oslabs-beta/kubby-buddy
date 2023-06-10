import express, { Request, Response } from 'express'
const containerRouter = express.Router()



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