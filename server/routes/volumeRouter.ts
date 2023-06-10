import express, { Request, Response } from "express"

const volumeRouter = express.Router()

volumeRouter.use('/', (_req: Request, res: Response) => {
    res.json('testing the volumeRouter')
})

export default volumeRouter