// import query from "../models/imageModels"
import query from '../db';
import { exec } from 'child_process';
import { promisify } from 'node:util';
// import { parse } from 'path';
// const exec = require('child_process')
// const promisify = require('node:util')
const promisifyExec = promisify(exec);

// const parseData = (stdout: string) => {
//   // const containers = [];
//   const dockerStats: string = stdout.trim();
//   const conts: string[] = dockerStats.split('\n');

//   return JSON.parse(conts[0]);
//   //returns array of proper objects to then be stringified
// };

type dataObject = {
  BlockIO: string;
  CPUPerc: string;
  Container: string;
  ID: string;
  MemPerc: string;
  MemUsage: string;
  Name: string;
  NetIO: string;
  PIDs: string;
  imageId: string;
};
const postgresController = {
  imageStats: async (data: dataObject[]) => {
    let newData = data.slice();
    const containerIds = newData.map((ele: dataObject) => ele.ID);
    const updatedData = await Promise.all(
      containerIds.map(async (ele, index) => {
        if (ele) {
          const { stdout, stderr } = await promisifyExec(
            `docker inspect --format='{{.Image}}' ${ele} | cut -d ':' -f 2 | cut -c 1-12`
          );
          console.log(stderr);
          const container = { ...data[index], imageId: stdout.trim() };

          const { CPUPerc, MemPerc, imageId } = container;

          const queryString = `
          INSERT INTO image_stats(cpu_per, mem_per, image_id, num_entries) 
          VALUES(${parseFloat(CPUPerc).toFixed(2)}, ${parseFloat(
            MemPerc
          ).toFixed(2)}, '${imageId}', 1)
          ON CONFLICT (image_id) DO UPDATE
          SET cpu_per = ROUND(((image_stats.cpu_per::numeric * image_stats.num_entries )+ excluded.cpu_per::numeric) / (image_stats.num_entries + 1), 2),
              mem_per = ROUND(((image_stats.mem_per::numeric * image_stats.num_entries )+ excluded.mem_per::numeric) / (image_stats.num_entries + 1), 2),
              image_id = excluded.image_id,
              num_entries = image_stats.num_entries + 1;
          `;

          query(queryString);

          return container;
        }
        return data[index];
      })
    );

    return updatedData;
    // {
    //     BlockIO: '0B / 0B',
    //     CPUPerc: '0.42%',
    //     Container: '41ee273a7096',
    //     ID: '41ee273a7096',
    //     MemPerc: '0.03%',
    //     MemUsage: '2.691MiB / 7.667GiB',
    //     Name: 'redis',
    //     PIDs: '5',
    //     NetIO: '1.15kB / 0B',
    //     imageName: 'redis:latest'
    // }
    //INSERT INTO image_stats (image_id, name, entries, mem_per, cpu_per VALUES (1, 'test', 1, 1, 1);
    //query database
    //for each value in the database
    //multiply by times entered, add new value, divide
  },
};

//run docke rps, swap id for name
//query database

export default postgresController;
