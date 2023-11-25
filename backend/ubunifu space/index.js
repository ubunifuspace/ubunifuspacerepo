const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 5000;
;

// import {userHistory} from 'react-router-dom'

app.use(cors());

app.use(bodyParser.json());


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Database connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ubunifu_space",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to Mysql database");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// api for log in for all the users

app.post("/login", (req, res) => {
    const { email, password } = req.body;  


    // query to fetch the role of the user in our database
  
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error("error in checking the user", error);
          return res.status(500).json({
            error: true,
            message: "error occur on server side during checking the user",
          });
        }
        if (results.length === 0) {
          // User not found
          return res.status(404).json({
            error: true,
            message: "User not found",
          });
        }
  
        const user = results[0];

        //if the user role_id = 1 query from admin

        if (user.role_id === 1) {
          db.query(
            "SELECT * FROM admin WHERE  email = ?  AND password = ?",
            [email, password],
            (error, results) => {
              if (error) {
                return res.status(500).json({
                  error: true,
                  message: "error has occured when fetching data fom admin",
                });
              }
  
              // the admin successifully authenticated
              const admin = results[0];
                res.json({admin});
 
            }
          );
        }
  
        // if the role = 2 query for moderators
        else if (user.role_id === 2) {
          db.query(
            "SELECT * FROM moderators WHERE email = ?  AND password = ?",
            [email, password],
            (error, results) => {
              if (error) {
                return res.status(500).json({
                  error: true,
                  message: "error has occured when fetching data fom institution",
                });
              }
  
              // the moderator successifully authenticated
              const moderator = results[0];
              res.json({moderator});

            }
          );
        }
        // if the role = 3 work on the  staff
        else {
          db.query(
            "SELECT * FROM staff WHERE  email = ?  AND password = ?",
            [email, password],
            (request, results) => {
              if (error) {
                return res.status(500).json({
                  error: true,
                  message: "error has occured when fetching data fom institution",
                });
              }
  
              // the staff successifully authenticated
              const staff = results[0];
              res.json({staff});
            }
          );
        }
      }
    );
  });
  

  // sifn up for staffs
  app.post("/staff/signUp", (req, res) => {
    const {
      name,
      email,
      password,
      staff_id ,
    } = req.body;
  
    // Perform input validation and error handling here
  
    // For example, you can check if the email is already in use
    db.query(
      "SELECT * from staff WHERE  email = ? ",
      [email],
      (error, results) => {
        if (error) {
          console.error("Error in checking duplicate email", error);
          return res.status(500).json({
            error: true,
            message: "An error occurred during registration_number verification.",
          });
        }
  
        if (results.length > 0) {
          return res.status(400).json({
            error: true,
            message: "email is already in use.",
          });
        }
      }
    );
  

  
      // inserting the staff to user table
      db.query(
        "INSERT INTO users (role_id, email, name) VALUES( ?, ?, ?)",
        [3, email, staff_name],
        (error, results) => {
          if (error) {
            console.error("Error inserting student to users:", error);
            return res.status(500).json({
              error: true,
              message: "Error inserting student",
            });
          }
  
          // Insert the new student record into the database

        }
      );
    });
