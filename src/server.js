import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';
import { __express } from 'hbs';
import flash from 'express-flash';
import expressSession from 'express-session';
import methodOverride from 'method-override';

import initializePassport from './config/passport';
import users from './routes/api/users';
import visitors from './routes/api/visitors';
import cars from './routes/api/cars';

const app = express();
const PORT = process.env.PORT || 5000;

//Initilize Configuration
initializePassport(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('html', __express);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(flash());
app.use(expressSession({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');
const checkNotAuthenticated = (req, res, next) => req.isAuthenticated() ? res.redirect('/profile') : next();

// ROUTES FOR HBS
app.get('/', (req, res) => res.render('index.html'));
app.get('/profile', checkAuthenticated, (req, res) => res.render('profile.html', { user: req.user }));
app.get('/newvisitor', checkAuthenticated, (req, res) => res.render('newvisitor.html'));
app.get('/register', checkNotAuthenticated, (req, res) => res.render('register.html'));
app.get('/login', checkNotAuthenticated, (req, res) => res.render('login.html'));

// ROUTES
app.use('/api/users', users);
app.use('/api/visitors', visitors);
app.use('/api/cars', cars);

app.listen(PORT, () => console.log(`Example app listening at port ${PORT}`));