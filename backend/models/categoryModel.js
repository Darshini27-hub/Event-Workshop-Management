const db = require("../config/db");

async function createCategory(name, description) {
    const [result] = await db.query(
        `INSERT INTO categories (name, description)
         VALUES (?, ?)`,
        [name, description]
    );

    return result.insertId;
}

async function getAllCategories() {
    const [rows] = await db.query(
        `SELECT *
         FROM categories
         ORDER BY id DESC`
    );

    return rows;
}

async function getCategoryById(id) {
    const [rows] = await db.query(
        "SELECT * FROM categories WHERE id = ?",
        [id]
    );

    return rows[0];
}

async function updateCategory(id, name, description) {
    await db.query(
        `UPDATE categories
         SET name = ?, description = ?
         WHERE id = ?`,
        [name, description, id]
    );
}

async function deleteCategory(id) {
    await db.query(
        "DELETE FROM categories WHERE id = ?",
        [id]
    );
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};