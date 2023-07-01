import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

const query = async (text: string, values?: any, callback?: any) => {
  try {
    const client = await pool.connect();
    console.log('Query sent.');
    const result = await new Promise((resolve, reject) => {
      client.query(text, values, (error: Error, queryData: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(queryData);
        }
        if (callback) {
          callback(error, queryData);
        }
      });
    });
    client.release();
    return result;
  } catch (err) {
    console.log(`Failed to connect to DB: ${err}`);
    throw err;
  }
};

export default query;
