import express, { Request, Response } from 'express';
import query from '../db';
const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const queryString = `
  SELECT cpu_per, mem_per
  FROM image_stats
  WHERE image_id = '1dd850aa6693'
  `;

  await query(queryString, [], (error: Error, queryData: any) => {
    if (error) res.status(500).send(error);
    res.json(queryData.rows);
    return;
  });
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

export default router;
