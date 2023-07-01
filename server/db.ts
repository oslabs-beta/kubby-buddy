import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

const startDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(`Failed to connect to DB: ${err}`);
  } finally {
    console.log('Connected to Database.');
  }
};

export default startDB;
