import { Router } from 'express';
import pool from '../../db';

const router = Router();

//@@ GET
//DESC Get all visitors
router.get('/', async(req, res) => {
  try {
    const text = 'SELECT * FROM visitors WHERE uuid = $1';
    values = [/* UUID */]
  } catch (err) {
    console.error(err);
  }
})

//@@ POST
//DESC Register new visitor
router.post('/new-visitor', async(req, res) => {
  try {
    const { name } = req.body;
    const text = 'INSERT INTO visitors(name, uuid) VALUES ($1, $2)';
    const values = [name, /* UUID */];
  } catch (err) {
    console.error(err);
  }
})

export default router