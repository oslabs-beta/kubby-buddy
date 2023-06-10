import express, { Request, Response } from 'express'

const imageRouter = express.Router()


imageRouter.use('/', (_req: Request, res: Response) => {
    res.send('imageRouter Test')
})

export default imageRouter