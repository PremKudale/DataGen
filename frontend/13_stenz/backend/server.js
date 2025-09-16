const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());  // Allow requests from your React frontend
app.use(express.json());  // To handle JSON requests

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12738947',
  password: '8UYZiuDRRx',
  database: 'sql12738947',
  port: 3306
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
