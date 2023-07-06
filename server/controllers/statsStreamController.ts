import { Request, Response, NextFunction } from 'express';
import { exec } from 'node:child_process';
import { StatsStreamController, ErrorDetails } from '../../types';
import { promisify } from 'node:util';
// import postgresController from './postgresController';
const promisifyExec = promisify(exec);

const parseData = (stdout: string) => {
  const containers = [];
  const dockerStats: string = stdout.trim();
  const conts: string[] = dockerStats.split('\n');

  for (let i = 0; i < conts.length; i++) {
    containers.push(JSON.parse(conts[i]));
  }
  //returns array of proper objects to then be stringified
  return containers;
};

const statsStreamController: StatsStreamController = {
  getAllContainerStats: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Connection', 'keep-alive');

      const interval = setInterval(async () => {
        try {
          const { stdout } = await promisifyExec(
            'docker stats --no-stream --format json'
          );

          res.status(200);
          const newDataObject = parseData(stdout);
          if (newDataObject) {
            // postgresController.fimageStats(newDataObject);
          }
          const newData: string = JSON.stringify(newDataObject);
          // console.log(newData);
          res.write('data: ' + newData + '\n\n');
          res.end();
          // return res.status(200).json(stdout);
        } catch (err) {
          next(err);
        }
      }, 500);

      res.on('close', () => {
        console.log('Client dropped');
        clearInterval(interval);
        res.end();
      });
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: 'error in the statsStreamController.getAllContainerStats catch',
        err: error,
        message:
          'error in the statsStreamController.getAllContainerStats catch',
      };
      next(errorDetails);
    }
  },
};

export default statsStreamController;
