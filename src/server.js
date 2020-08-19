import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';

import users from './routes/api/users';
import visitors from './routes/api/visitors';
import cars from './routes/api/cars';
import { __express } from 'hbs';

const app = express();
const PORT = process.env.PORT || 5000;

require('./config/passport');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('html', __express);

app.get('/', (req, res) => res.render('index.html', {name: 'anthony'}));
app.get('/profile', (req, res) => res.render('profile.html'));
app.get('/newvisitor', (req, res) => res.render('newvisitor.html'));
app.get('/register', (req, res) => res.render('register.html'));

//app.use(express.static(path.join(__dirname, 'public')));
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