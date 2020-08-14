import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import { Client } from 'pg';

import users from './routes/api/users';

const app = express();
const PORT = process.env.PORT || 5000;
const client = new Client();

async function pgConnect() {
  await client.connect();

  const res = await client.query('SELECT * FROM users')
  await client.end();
  console.log(res)
}

pgConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/users', users);

app.listen(PORT, () => console.log(`Example app listening at port ${PORT}`));