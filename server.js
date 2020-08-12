require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({extended: false}));
app.use(cors());
console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Example app listening at port ${PORT}`));