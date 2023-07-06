// // import query from "../models/imageModels"
// import { Request, Response, NextFunction } from 'express';
// import query from '../db';
// import { exec } from 'child_process';
// import { promisify } from 'node:util';

// // import { parse } from 'path';
// // const exec = require('child_process')
// // const promisify = require('node:util')
// const promisifyExec = promisify(exec);

// type dataObject = {
//   BlockIO: string;
//   CPUPerc: string;
//   Container: string;
//   ID: string;
//   MemPerc: string;
//   MemUsage: string;
//   Name: string;
//   NetIO: string;
//   PIDs: string;
//   imageId: string;
// };

// type Image = {
//   Containers: string;
//   CreatedAt: string;
//   CreatedSince: string;
//   Digest: string;
//   ID: string;
//   Repository: string;
//   SharedSize: string;
//   Size: string;
//   Tag: string;
//   UniqueSize: string;
//   VirtualSize: string;
// };
// // type postgresData = {
// //   cpu_per: number;
// //   mem_per: number;
// //   image_id: string;
// //   num_entries: number;
// // };

// const postgresController = {
//   imageStats: async (data: dataObject[]) => {
//     let newData = data.slice();
//     const containerIds = newData.map((ele: dataObject) => ele.ID);
//     const updatedData = await Promise.all(
//       containerIds.map(async (ele, index) => {
//         if (ele) {
//           const { stdout, stderr } = await promisifyExec(
//             `docker inspect --format='{{.Image}}' ${ele} | cut -d ':' -f 2 | cut -c 1-12`
//           );
//           console.log(stderr, 'image stats');
//           const container = { ...data[index], imageId: stdout.trim() };

//           const { CPUPerc, MemPerc, imageId } = container;

//           const queryString = `
//           INSERT INTO image_stats(cpu_per, mem_per, image_id, num_entries)
//           VALUES(${parseFloat(CPUPerc).toFixed(2)}, ${parseFloat(
//             MemPerc
//           ).toFixed(2)}, '${imageId}', 1)
//           ON CONFLICT (image_id) DO UPDATE
//           SET cpu_per = ROUND(((image_stats.cpu_per::numeric * image_stats.num_entries )+ excluded.cpu_per::numeric) / (image_stats.num_entries + 1), 2),
//               mem_per = ROUND(((image_stats.mem_per::numeric * image_stats.num_entries )+ excluded.mem_per::numeric) / (image_stats.num_entries + 1), 2),
//               image_id = excluded.image_id,
//               num_entries = image_stats.num_entries + 1;
//           `;

//           query(queryString);

//           return container;
//         }
//         return data[index];
//       })
//     );

//     return updatedData;
//   },

//   grabImageStats: async (_req: Request, res: Response, next: NextFunction) => {
//     res.locals.averages = [];

//     try {
//       await Promise.all(
//         res.locals.images.map(async (ele: Image) => {
//           const queryString: string = `
//         SELECT cpu_per, mem_per
//         FROM image_stats
//         WHERE image_id = '${ele.ID}'
//       `;
//           // res.locals.averages.push('hi');

//           await query(queryString, [], async (error: Error, queryData: any) => {
//             if (error) {
//               console.log('error in grabImage');
//               next({
//                 log: 'error in the grabImageStats middleware',
//                 err: error,
//               });
//             }

//             console.log('A', queryData.rows);

//             res.locals.averages.push(queryData.rows[0]);
//           });
//         })
//       );

//       console.log('B', res.locals.averages);

//       return next();
//     } catch (err) {
//       return next(err);
//     }
//   },
// };

// export default postgresController;
