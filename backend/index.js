const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ubunifu_space',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to Mysql database');
});


// Home route
app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Ubunifu space Backend ');
});






// User Endpoints
app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('Ubunifu space Backend ');
});

app.get('/user', (req, res) => {
    console.log(req.body);
    res.send('Ubunifu space Backend ');
});






// Authentication Endpoints
app.post('/login', async (req, res) => {

    try {
        const { staffid, password } = req.body;

        const results = await queryDatabase('SELECT id, staff_id, name, email, department, role_id FROM users WHERE email = ? AND password = ?', [staffid, password]);

        if (results.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const user = results[0];

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        });
    } catch (error) {
        console.error('Error in checking the user', error);
        res.status(500).json({
            error: true,
            message: 'Error on the server side during login',
        });
    }
});




// Helper function for database queries
function queryDatabase(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Listening port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
