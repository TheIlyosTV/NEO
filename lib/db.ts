import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let pool: mysql.Pool | null = null;

async function getConnection(): Promise<mysql.PoolConnection> {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool.getConnection();
}

export default getConnection;