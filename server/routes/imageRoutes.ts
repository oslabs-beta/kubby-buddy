import express, { Request, Response } from 'express'
import imageController from '../controllers/imageController'

const imageRouter = express.Router()


imageRouter.get('/all-images', imageController.getAllImages, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.images)
})

imageRouter.use('/', (_req: Request, res: Response) => {
    res.send('imageRouter Test')
})

export default imageRouter