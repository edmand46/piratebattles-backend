import * as dotenv from 'dotenv';

dotenv.config();

import * as knex from "knex";
import config from '../config/database';

export const USERS_TABLE = 'users';

const connection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS || '',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
};

export const database = knex({
  ...config,
  client: 'pg',
  connection,
});



