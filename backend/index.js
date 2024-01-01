const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Home route
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Ubunifu space Backend ");
});

// User Endpoints
app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("Ubunifu space Backend ");
});

// Authentication Endpoints
app.post("/login", async (req, res) => {
  try {
    const { staffid, password } = req.body;

    const results = await queryDatabase(
      "SELECT id, staff_id, name, email, department, role_id FROM users WHERE email = ? AND password = ?",
      [staffid, password]
    );

    if (results.length === 0) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    const user = results[0];

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.error("Error in checking the user", error);
    res.status(500).json({
      error: true,
      message: "Error on the server side during login",
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { staff_id, name, email, password, department, role_id } = req.body;

    // Check if the email is already registered
    const emailExists = await queryDatabase(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (emailExists.length > 0) {
      return res.status(400).json({
        error: true,
        message: "Email is already registered",
      });
    }

    // If email is not registered, proceed with user registration
    const results = await queryDatabase(
      "INSERT INTO users (staff_id, name, email, password, department, role_id) VALUES (?, ?, ?, ?, ?, ?)",
      [staff_id, name, email, password, department, role_id]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: results.insertId, // The ID of the newly inserted user
    });
  } catch (error) {
    console.error("Error in user registration", error);
    res.status(500).json({
      error: true,
      message: "Error on the server side during user registration",
    });
  }
});

// PROBLEMS APIS
app.post("/create-problem", async (req, res) => {
  try {
    const { user_id, title, description, department } = req.body;

    // Proceed with problem creation
    const results = await queryDatabase(
      "INSERT INTO problem (user_id, title, description, department) VALUES (?, ?, ?, ?)",
      [user_id, title, description, department]
    );

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problemId: results, // The ID of the newly inserted problem
    });
  } catch (error) {
    console.error("Error in creating problem", error);
    res.status(500).json({
      error: true,
      message: "Error on the server side during problem creation",
    });
  }
});

app.get("/problems", async (req, res) => {
  try {
    // Fetch all problems with associated like counts for each idea
    const query = `
            SELECT
                p.id AS problem_id,
                p.user_id AS problem_user_id,
                p.title AS problem_title,
                p.description AS problem_description,
                p.department AS problem_department,
                i.id AS idea_id,
                i.color AS idea_color,
                i.user_id AS idea_user_id,
                i.description AS idea_description,
                COUNT(l.id) AS like_count
            FROM
                problem p
            LEFT JOIN
                idea i ON p.id = i.problem_id
            LEFT JOIN
                likes l ON i.id = l.idea_id
            GROUP BY
                p.id, p.user_id, p.title, p.description, p.department, i.id, i.user_id, i.description;
        `;

    const results = await queryDatabase(query);

    // Organize the data into a suitable structure
    const problemsWithIdeas = results.reduce((acc, row) => {
      const existingProblem = acc.find(
        (problem) => problem.problem_id === row.problem_id
      );

      // Create the problem if it doesn't exist
      if (!existingProblem) {
        const newProblem = {
          problem_id: row.problem_id,
          user_id: row.problem_user_id,
          title: row.problem_title,
          description: row.problem_description,
          department: row.problem_department,
          ideas: [],
        };
        acc.push(newProblem);
        return acc;
      }

      // Use the existing problem
      const currentProblem = acc.find(
        (problem) => problem.problem_id === row.problem_id
      );

      currentProblem.ideas.push({
        idea_id: row.idea_id,
        user_id: row.idea_user_id,
        description: row.idea_description,
        like_count: row.like_count,
        ideaColor: row.idea_color
      });

      return acc;
    }, []);

    res.status(200).json({
      success: true,
      problemsWithIdeas: problemsWithIdeas,
    });
  } catch (error) {
    console.error("Error in fetching problems with ideas and likes", error);
    res.status(500).json({
      error: true,
      message: "Error on the server side during data retrieval",
    });
  }
});

// IDEAS ENDPOINTS
app.post("/create-idea", async (req, res) => {
  try {
    const { problem_id, user_id, description, color } = req.body;

    console.log(color);

    // Insert the idea into the database
    const results = await queryDatabase(
      "INSERT INTO idea (problem_id, user_id, description, color) VALUES (?, ?, ?, ?)",
      [problem_id, user_id, description, color]
    );

    res.status(201).json({
      success: true,
      message: "Idea created successfully",
      ideaId: results.insertId, // The ID of the newly inserted idea
    });
  } catch (error) {
    console.error("Error in creating idea", error);
    res.status(500).json({
      error: true,
      message: "Error on the server side during idea creation",
    });
  }
});

// LIKE AN IDEA ENDPOINT
app.put("/like-idea/:idea_id", async (req, res) => {
  try {
    const { idea_id } = req.params;
    const { user_id } = req.body;

    // Check if the user has already liked the idea
    const existingLike = await queryDatabase(
      "SELECT * FROM likes WHERE user_id = ? AND idea_id = ?",
      [user_id, idea_id]
    );

    if (existingLike.length > 0) {
      // User has already liked the idea, so unlike it
      await queryDatabase(
        "DELETE FROM likes WHERE user_id = ? AND idea_id = ?",
        [user_id, idea_id]
      );

      return res.status(200).json({
        success: true,
        message: "Successfully unliked the idea",
      });
    }

    // User has not liked the idea, so like it
    const likedIdea = await queryDatabase(
      "INSERT INTO likes (user_id, idea_id) VALUES (?, ?)",
      [user_id, idea_id]
    );

    // Sending a success response
    res.status(200).json({
      success: true,
      message: "Successfully liked the idea",
      likedIdea,
    });

    // Logging the liked idea
    console.log(likedIdea);
  } catch (error) {
    // Handling errors
    console.error("Error in liking/unliking an idea", error);
    res.status(500).json({
      error: true,
      message: "Error in liking/unliking an idea",
    });
  }
});

// GET ALL COMMENTS FOR AN IDEA



// Getting comments for a specific idea
app.get("/api/commentsForIdea/:ideaId", async (req, res) => {
  try {
    const ideaId = req.params.ideaId;

    // Validate ideaId
    if (!ideaId || isNaN(ideaId)) {
      return res.status(400).json({
        error: true,
        message: "Invalid ideaId provided",
      });
    }

    // Use async/await for database query
    const results = await dbQuery("SELECT * FROM comments WHERE idea_id = ?", [ideaId]);

    console.log("Comments retrieved successfully");
    res.status(200).json({
      success: true,
      comments: results,
    });
  } catch (error) {
    console.error("Error occurred during retrieval", error);
    res.status(500).json({
      error: true,
      message: "There was an error occurred during retrieval",
    });
  }
});

// Helper function for asynchronous database queries
function dbQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}




// ADD A COMMENT FOR AN IDEA

// Inserting the comment
app.post("/api/insertComment", (req, res) => {
  const { comment, user_id, idea_id } = req.body;

  db.query(
    "INSERT INTO comments (comment, user_id, idea_id) VALUES (?, ?, ?)",
    [comment, user_id, idea_id],
    (error, results) => {
      if (error) {
        console.error("Error occurred during insertion", error);
        return res.status(500).json({
          error: true,
          message: "There was an error occurred during insertion",
        });
      } else {
        console.log("Comment inserted successfully");
        res.json({
          success: true,
          message: "Comment inserted successfully",
        });
      }
    }
  );
});

// updating the comment

app.put("/api/updateComment/:commentId", (req, res) => {
  const { updatedComment, updatedUserId } = req.body;
  const commentIdToUpdate = req.params.commentId;

  // Update statement
  db.query(
    "UPDATE comments SET comment = ? WHERE id = ? AND user_id = ?",
    [updatedComment, commentIdToUpdate, updatedUserId],
    (error, results) => {
      if (error) {
        console.error("Error occurred during update", error);
        return res.status(500).json({
          error: true,
          message: "There was an error occurred during update",
        });
      } else {
        console.log("Comment updated successfully");
      }
    }
  );
});

// Deleting the comment
app.delete("/api/deleteComment/:commentId", (req, res) => {
  const commentIdToDelete = req.params.commentId;

  db.query(
    "DELETE FROM comments WHERE id = ?",
    [commentIdToDelete],
    (error, results) => {
      if (error) {
        console.error("Error occurred during delete", error);
        return res.status(500).json({
          error: true,
          message: "There was an error occurred during delete",
        });
      } else {
        console.log("Comment deleted successfully");
        res.json({
          success: true,
          message: "Comment deleted successfully",
        });
      }
    }
  );
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
