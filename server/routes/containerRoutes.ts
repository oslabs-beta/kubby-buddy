import express, { Request, Response } from 'express'
const containerRouter = express.Router()

containerRouter.use('/', (_req: Request, res: Response) => {
    res.send('containerRouter test')
})

export default containerRouter