import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';

import users from './routes/api/users';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// ROUTES
app.use('/api/users', users);

app.listen(PORT, () => console.log(`Example app listening at port ${PORT}`));