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

app.post('/register', async (req, res) => {
    try {
        const { staff_id, name, email, password, department, role_id } = req.body;

        // Check if the email is already registered
        const emailExists = await queryDatabase('SELECT * FROM users WHERE email = ?', [email]);

        if (emailExists.length > 0) {
            return res.status(400).json({
                error: true,
                message: 'Email is already registered',
            });
        }

        // If email is not registered, proceed with user registration
        const results = await queryDatabase(
            'INSERT INTO users (staff_id, name, email, password, department, role_id) VALUES (?, ?, ?, ?, ?, ?)',
            [staff_id, name, email, password, department, role_id]
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: results.insertId, // The ID of the newly inserted user
        });
    } catch (error) {
        console.error('Error in user registration', error);
        res.status(500).json({
            error: true,
            message: 'Error on the server side during user registration',
        });
    }
});


// PROBLEMS APIS
app.post('/create-problem', async (req, res) => {
    try {
        const { user_id, title, description, department } = req.body;

        // Proceed with problem creation
        const results = await queryDatabase(
            'INSERT INTO problem (user_id, title, description, department) VALUES (?, ?, ?, ?)',
            [user_id, title, description, department]
        );

        res.status(201).json({
            success: true,
            message: 'Problem created successfully',
            problemId: results, // The ID of the newly inserted problem
        });
    } catch (error) {
        console.error('Error in creating problem', error);
        res.status(500).json({
            error: true,
            message: 'Error on the server side during problem creation',
        });
    }
});



app.get('/problems', async (req, res) => {
    try {
        // Fetch all problems with their associated ideas using a JOIN query
        const results = await queryDatabase(`
            SELECT p.*, i.*
            FROM problem p
            LEFT JOIN idea i ON p.problem_id = i.problem_id
        `);

        // Organize the data into a suitable structure
        const problemsWithIdeas = results.reduce((acc, row) => {
            const problemId = row.problem_id;

            if (!acc[problemId]) {
                // Create an entry for the problem if it doesn't exist
                acc[problemId] = {
                    problem: {
                        problem_id: row.problem_id,
                        user_id: row.user_id,
                        title: row.title,
                        description: row.description,
                        department: row.department
                    },
                    ideas: [],
                };
            }

            // Add the idea to the associated problem
            if (row.idea_id) {
                acc[problemId].ideas.push({
                    idea_id: row.idea_id,
                    user_id: row.user_id,
                    description: row.description
                });
            }

            return acc;
        }, {});

        // Convert the object to an array
        const problemsWithIdeasArray = Object.values(problemsWithIdeas);

        res.status(200).json({
            success: true,
            problemsWithIdeas: problemsWithIdeasArray,
        });
    } catch (error) {
        console.error('Error in fetching problems with ideas', error);
        res.status(500).json({
            error: true,
            message: 'Error on the server side during data retrieval',
        });
    }
});



// IDEAS ENDPOINTS
app.post('/create-idea', async (req, res) => {
    try {
        const { problem_id, user_id, description } = req.body;

        // Insert the idea into the database
        const results = await queryDatabase(
            'INSERT INTO idea (problem_id, user_id, description) VALUES (?, ?, ?)',
            [problem_id, user_id, description]
        );

        res.status(201).json({
            success: true,
            message: 'Idea created successfully',
            ideaId: results.insertId, // The ID of the newly inserted idea
        });
    } catch (error) {
        console.error('Error in creating idea', error);
        res.status(500).json({
            error: true,
            message: 'Error on the server side during idea creation',
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
