import { Router } from 'express';
import pool from '../../db';
import bcrypt, { hash } from 'bcrypt';
import passport from 'passport';

const router = Router();

// @@ POST
// DESC Register a new user
router.post('/register', async(req, res) => {
  try {
    const { name, password, email } = req.body;

    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if(users.rowCount) {
      return res.status(400).json({ email: 'Email already exists'});
    } else {
      bcrypt.hash(password, 10, async(err, hash) => {
        const text = 'INSERT INTO users(password, name, email) VALUES ($1, $2, $3)';
        const values = [hash, name, email];
        const result = await pool.query(text, values)
        return res.json(result);
      })
    }
  } catch (err) {
    console.error(err.message);
    res.redirect('/register')
  }
});

// @@ POST
// DESC Login a user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.put('/:userId', (req, res) => res.send('PUT HTTP method on user resource'));

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

export default router;