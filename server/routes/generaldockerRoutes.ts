import express, { Request, Response } from 'express'
const generalDockerRouter = express.Router()

generalDockerRouter.use('/', (_req: Request, res: Response) => {
    res.send('generalDockerRouter test')
})

export default generalDockerRouter
