import { Router } from 'express';
import pool from '../../db';
import bcrypt, { hash } from 'bcrypt';

const router = Router();

router.get('/', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.send(result)
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/:userId', (req, res) => {
  return res.send(users[req.params.userId])
});

router.post('/register', async(req, res) => {
  try {
    const { name, password, email } = req.body;
    let passwordHashed;

    bcrypt.hash(password, 4, (err, hash) => {
      err ? console.error(err) : passwordHashed = hash
    })

    const text = 'INSERT INTO users(password, name, email) VALUES ($1, $2, $3)';
    const values = [passwordHashed, name, email];
    const result = await pool.query(text, values)
    console.log(result)
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/:userId', (req, res) => res.send('PUT HTTP method on user resource'));

router.delete('/:userId', (req, res) => res.send('DELETE HTTP method on user resource'));

export default router;