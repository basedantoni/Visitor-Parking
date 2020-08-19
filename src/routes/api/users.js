import { Router } from 'express';
import pool from '../../db';
import bcrypt, { hash } from 'bcrypt';

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
  }
});

// @@ POST
// DESC Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await pool.query('SELECT password FROM users WHERE email = $1', [email]);

    if(!users.rowCount) {
      return res.status(400).json({ email: 'This email does not exist' });
    }

    let passwordToMatch = users.rows[0].password;
    bcrypt.compare(password, passwordToMatch).then(isMatch => {
      if(isMatch) {
        res.json({ success: 'user exists' })
      } else {
        return res.status(400).json({ error: 'Incorrect password' })
      }
    })

  } catch (err) {
    console.error(err)
  }
})

router.put('/:userId', (req, res) => res.send('PUT HTTP method on user resource'));

router.delete('/:userId', (req, res) => res.send('DELETE HTTP method on user resource'));

export default router;