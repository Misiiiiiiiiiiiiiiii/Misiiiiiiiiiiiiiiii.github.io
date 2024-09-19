const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Misii',
  password: 'LigenBalls5636',
  database: 'egyetemek'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM egyetemek', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.post('/add', (req, res) => {
  const { Ország, Egyetem_neve, Város, Vidék_Város, Minimum_pontszam, Ágazat, Tanfolyam_hossza } = req.body;
  connection.query('INSERT INTO egyetemek (Ország, Egyetem_neve, Város, Vidék_Város, Minimum_pontszam, Ágazat, Tanfolyam_hossza) VALUES (?, ?, ?, ?, ?, ?, ?)', [Ország, Egyetem_neve, Város, Vidék_Város, Minimum_pontszam, Ágazat, Tanfolyam_hossza], (err, results) => {
    if (err) {
      console.error('Error adding data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ message: 'Data added successfully', id: results.insertId });
    }
  });
});

app.post('/edit', (req, res) => {
  const { id, Ország, Egyetem_neve, Város, Vidék_Város, Minimum_pontszam, Ágazat, Tanfolyam_hossza } = req.body;
  connection.query('UPDATE egyetemek SET Ország = ?, Egyetem_neve = ?, Város = ?, Vidék_Város = ?, Minimum_pontszam = ?, Ágazat = ?, Tanfolyam_hossza = ? WHERE id = ?', [Ország, Egyetem_neve, Város, Vidék_Város, Minimum_pontszam, Ágazat, Tanfolyam_hossza, id], (err, results) => {
    if (err) {
      console.error('Error editing data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ message: 'Data edited successfully' });
    }
  });
});

app.post('/delete', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM egyetemek WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ message: 'Data deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});