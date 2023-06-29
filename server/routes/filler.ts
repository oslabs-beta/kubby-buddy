import express, { Request, Response } from 'express';
import query from '../db';
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const queryString = `
  INSERT INTO image_stats(id, cpu_per, mem_per, image_name, num_entries) 
  VALUES(1, 5.24, 2.14, 'test', 1)
  ON CONFLICT (id) DO UPDATE
  SET cpu_per = excluded.cpu_per,
      mem_per = excluded.mem_per,
      image_name = excluded.image_name,
      num_entries = excluded.num_entries;
  `;

  query(queryString).then((data) => console.log(data));
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

export default router;
