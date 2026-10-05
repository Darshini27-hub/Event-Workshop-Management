const db = require("../config/db");

async function findUserByEmail(email) {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
}

async function findUserById(id) {
    const [rows] = await db.query(
        "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
}

async function createUser(name, email, password, role = "user") {
    const [result] = await db.query(
        `INSERT INTO users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [name, email, password, role]
    );

    return result.insertId;
}

async function getAllUsers() {
    const [rows] = await db.query(
        `SELECT id, name, email, role, created_at
         FROM users
         ORDER BY id DESC`
    );

    return rows;
}

async function updateUser(id, name, email, role) {
    await db.query(
        `UPDATE users
         SET name = ?, email = ?, role = ?
         WHERE id = ?`,
        [name, email, role, id]
    );
}

async function deleteUser(id) {
    await db.query(
        "DELETE FROM users WHERE id = ?",
        [id]
    );
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};