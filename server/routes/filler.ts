import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('test');
});

router.get('/:id', (req: Request, res: Response) => {
  res.send(req.params.id);
});

router.post('/', (_req: Request, res: Response) => {
  res.send('test post');
});

router.patch('/', (_req: Request, res: Response) => {
  res.send('test patch');
});

router.delete('/', (_req: Request, res: Response) => {
  res.send('test delete');
});

module.exports = router;
