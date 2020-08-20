import pool from '../db';

exports.renderProfile = async(req, res) => {
  try {
    const uuid = req.session.passport.user;
    const text = 'SELECT vuid, name FROM visitors WHERE uuid = $1';
    const values = [uuid];
    const result = await pool.query(text, values);

    result.rowCount ? res.render('profile.html', { visitors: result.rows, user: req.user }) 
      : res.render('profile.html', { visitors: 'No visitors yet', user: req.user })
  } catch (err) {
    console.error(err);
  }
}

exports.renderNewCar = (req, res) => {
  return res.render('newcar.html')
}