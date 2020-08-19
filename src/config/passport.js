import 'dotenv/config';

import pool from '../db';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';

const initialize = (passport) => {
  const authenticateUser = async(email, password, done) => {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if(!user.rowCount) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if(await bcrypt.compare(password, user.rows[0].password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  }

  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.rows[0].uuid));
  passport.deserializeUser(async(id, done) => { 
    return done(null, await pool.query('SELECT * FROM users WHERE uuid = $1', [id]));
  });
}

export default initialize;