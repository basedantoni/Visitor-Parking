import 'dotenv/config';

import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
const JWTStrategy = require('passport-jwt').Strategy;


const jsonSecret = process.env.SECRET;

