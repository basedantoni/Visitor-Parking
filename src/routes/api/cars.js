import { Router } from 'express';
import pool from '../../db';

const router = Router();

//@@ GET
//DESC Get all cars
router.get('/', async(req, res) => {
  try {
    const text = 'SELECT * FROM cars WHERE vuid = $1';
    const value = [/* VUID */]
  } catch (err) {
    console.error(err);
  }
})

//@@ POST
//DESC Register a new car
router.post('/new-car', async(req, res) => {
  try {
    const { make, model, color, plate } = req.body;

    const text = 'INSERT INTO cars VALUES ($1, $2, $3, $4, $5)';
    const values = [make, model, color, plate, /* need to add VUID */];

    const result = await pool.query(text, values);
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

export default router