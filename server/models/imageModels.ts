import { Pool } from 'pg';

//process.env.PGHOST;
const PG_URI =
  'postgres://miprnoed:LAZstS_z_xZhHFeZsDib4Kv5FgdEiUJ9@rajje.db.elephantsql.com/miprnoed';

const pool = new Pool({
  connectionString: PG_URI,
});

export default {
  query: (text: string, params: any, callback: any) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
