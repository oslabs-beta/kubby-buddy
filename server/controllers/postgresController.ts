// import query from "../models/imageModels"
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

//run docker stats store output
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
  imageName: string;
};
const postgresController = {
  imageStats: async (data: dataObject[]) => {
    let newData = data.slice();
    const containerIds = newData.map((ele: dataObject) => ele.ID);
    const updatedData = await Promise.all(
      containerIds.map(async (ele, index) => {
        if (ele) {
          const { stdout, stderr } = await promisifyExec(
            `docker inspect --format='{{.Config.Image}}' ${ele}`
          );
          console.log(stderr);
          return { ...data[index], imageName: stdout.trim() };
        }
        return data[index];
      })
    );

    return updatedData;

    //INSERT INTO image_stats (image_id, name, entries, mem_per, cpu_per VALUES (1, 'test', 1, 1, 1);
    //query database
    //for each value in the database
    //multiply by times entered, add new value, divide
  },
};

//run docke rps, swap id for name
//query database

export default postgresController;
