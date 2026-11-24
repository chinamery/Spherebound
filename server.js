
const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");
require("dotenv").config();

// ==================================
// 1. SERVER CONFIGURATION
// ==================================

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ==================================
// 2. DATABASE CONNECTION
// ==================================

const db = new Database("database.db");

db.pragma("journal_mode = WAL");

// Create database table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// ==================================
// 3. HOME ROUTE
// ==================================

app.get("/", (req, res) => {
    res.json({
        message: "Backend API is running!",
        status: "success"
    });
});

// ==================================
// 4. GET ALL USERS
// ==================================

app.get("/api/users", (req, res) => {
    try {
        const users = db.prepare(
            "SELECT * FROM users ORDER BY id DESC"
        ).all();

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================================
// 5. GET USER BY ID
// ==================================

app.get("/api/users/:id", (req, res) => {
    const user = db.prepare(
        "SELECT * FROM users WHERE id = ?"
    ).get(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// ==================================
// 6. CREATE USER
// ==================================

app.post("/api/users", (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const result = db.prepare(`
            INSERT INTO users (name, email)
            VALUES (?, ?)
        `).run(name, email);

        res.status(201).json({
            message: "User created successfully",
            id: result.lastInsertRowid
        });

    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            error: error.message
        });
    }
});

// ==================================
// 7. UPDATE USER
// ==================================

app.put("/api/users/:id", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    try {
        const result = db.prepare(`
            UPDATE users
            SET name = ?, email = ?
            WHERE id = ?
        `).run(name, email, req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// ==================================
// 8. DELETE USER
// ==================================

app.delete("/api/users/:id", (req, res) => {
    const result = db.prepare(
        "DELETE FROM users WHERE id = ?"
    ).run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json({
        message: "User deleted successfully"
    });
});

// ==================================
// 9. ERROR HANDLING
// ==================================

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

// ==================================
// 10. START SERVER
// ==================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
