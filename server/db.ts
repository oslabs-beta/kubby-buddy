import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

const query = async (text: string, values?: []) => {
  try {
    const client = await pool.connect();
    await client.query(text, values);
    client.release();
  } catch (err) {
    console.log(`Failed to connect to DB: ${err}`);
  } finally {
    console.log('Query sent.');
  }
};

//process.env.PGHOST;
// const PG_URI =
//   'postgres://miprnoed:LAZstS_z_xZhHFeZsDib4Kv5FgdEiUJ9@rajje.db.elephantsql.com/miprnoed';

// const pool = new Pool({
//   connectionString: PG_URI,
// });

// export default {
//   query: (text: string, params: any, callback: any) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };

export default query;
