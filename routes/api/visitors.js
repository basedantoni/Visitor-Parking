import { Router } from 'express';
import pool from '../../db';
import controller from '../../controllers/controller';

const router = Router();

//@@ POST
//DESC Register new visitor
router.post('/new-visitor', async(req, res) => {
  try {
    const { name, make, model, color, plate } = req.body;
    const uuid = req.session.passport.user;

    // Check for existing user
    const visitor = await pool.query('SELECT * FROM visitors WHERE name = $1', [name]);
    if(visitor.rowCount) {
      return res.status(400).json({ error: 'visitor already exists' });
    } else {
      // Insert new visitor
      await pool.query('INSERT INTO visitors(name, uuid) VALUES ($1, $2)', [name, uuid]);

      // Get new visitors vuid
      const vuid = await pool.query('SELECT vuid FROM visitors WHERE name = $1', [name]);
      
      // Add car to new visitors cars
      await pool.query('INSERT INTO cars VALUES ($1, $2, $3, $4, $5)', [make, model, color, plate, vuid.rows[0].vuid]);

      res.redirect('/profile');
    }
  } catch (err) {
    console.error(err);
  }
})

export default router