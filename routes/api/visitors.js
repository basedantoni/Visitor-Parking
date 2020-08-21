import { Router } from 'express';
import pool from '../../db';
import sendEmail from '../../public/js/email';

const router = Router();

router.get('/book-visitor', async (req, res) => {
  try {
    const result = await pool.query(`SELECT users.name, cars.make, cars.model, cars.color, cars.license_plate FROM cars, users WHERE cars.vuid = '${req.session.vuid}' and users.uuid = '${req.session.passport.user}'`)
    console.log(result)
    const visitInfo = {
      name: result.rows[0].name,
      visitor: req.query.name,
      make: result.rows[0].make,
      model: result.rows[0].model,
      color: result.rows[0].color,
      plate: result.rows[0].license_plate,
      date: req.query.date
    }
    sendEmail(visitInfo);
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
  }
})

//@@ GET
//DESC Get VUID for session
router.get('/vuid', async(req, res) => {
  try {
    const { name } = req.query;
    const vuid = await pool.query('SELECT vuid FROM visitors WHERE name = $1', [name]);

    req.session.vuid = vuid.rows[0].vuid;
    return res.redirect('/newcar');

  } catch (err) {
    console.error(err);
  }
})

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

      return res.redirect('/profile');
    }
  } catch (err) {
    console.error(err);
  }
})

export default router