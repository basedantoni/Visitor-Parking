import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';

import users from './routes/api/users';
import visitors from './routes/api/visitors';
import cars from './routes/api/cars';

const app = express();
const PORT = process.env.PORT || 5000;

require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../public')));

// ROUTES
app.use('/api/users', users);
app.use('/api/visitors', visitors);
app.use('/api/cars', cars);

app.listen(PORT, () => console.log(`Example app listening at port ${PORT}`));