const db = require("../config/db");

async function createEvent(eventData) {
    const {
        title,
        description,
        category_id,
        event_date,
        event_time,
        location,
        capacity,
        created_by
    } = eventData;

    const [result] = await db.query(
        `INSERT INTO events
        (title, description, category_id, event_date,
         event_time, location, capacity, available_seats, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description,
            category_id,
            event_date,
            event_time,
            location,
            capacity,
            capacity,
            created_by
        ]
    );

    return result.insertId;
}

async function getAllEvents({
    search,
    category,
    page,
    limit,
    sort
}) {
    const offset = (page - 1) * limit;

    let query = `
        SELECT
            e.id,
            e.title,
            e.description,
            e.event_date,
            e.event_time,
            e.location,
            e.capacity,
            e.available_seats,
            e.created_at,
            c.name AS category,
            u.name AS created_by_name
        FROM events e
        INNER JOIN categories c
            ON e.category_id = c.id
        LEFT JOIN users u
            ON e.created_by = u.id
        WHERE 1 = 1
    `;

    const values = [];

    if (search) {
        query += `
            AND (
                e.title LIKE ?
                OR e.description LIKE ?
                OR e.location LIKE ?
            )
        `;

        const searchValue = `%${search}%`;

        values.push(
            searchValue,
            searchValue,
            searchValue
        );
    }

    if (category) {
        query += " AND e.category_id = ?";
        values.push(category);
    }

    const allowedSorts = {
        date_asc: "e.event_date ASC",
        date_desc: "e.event_date DESC",
        title_asc: "e.title ASC",
        title_desc: "e.title DESC"
    };

    query += `
        ORDER BY ${allowedSorts[sort] || "e.event_date ASC"}
        LIMIT ? OFFSET ?
    `;

    values.push(Number(limit), Number(offset));

    const [rows] = await db.query(query, values);

    const [countRows] = await db.query(
        `SELECT COUNT(*) AS total
         FROM events e
         WHERE 1 = 1
         ${search ? `
            AND (
                e.title LIKE ?
                OR e.description LIKE ?
                OR e.location LIKE ?
            )
         ` : ""}
         ${category ? "AND e.category_id = ?" : ""}`,
        [
            ...(search
                ? [
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`
                ]
                : []),
            ...(category ? [category] : [])
        ]
    );

    return {
        events: rows,
        total: countRows[0].total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(
            countRows[0].total / limit
        )
    };
}

async function getEventById(id) {
    const [rows] = await db.query(
        `SELECT
            e.*,
            c.name AS category,
            u.name AS created_by_name
         FROM events e
         INNER JOIN categories c
             ON e.category_id = c.id
         LEFT JOIN users u
             ON e.created_by = u.id
         WHERE e.id = ?`,
        [id]
    );

    return rows[0];
}

async function updateEvent(id, eventData) {
    const {
        title,
        description,
        category_id,
        event_date,
        event_time,
        location,
        capacity
    } = eventData;

    await db.query(
        `UPDATE events
         SET title = ?,
             description = ?,
             category_id = ?,
             event_date = ?,
             event_time = ?,
             location = ?,
             capacity = ?
         WHERE id = ?`,
        [
            title,
            description,
            category_id,
            event_date,
            event_time,
            location,
            capacity,
            id
        ]
    );
}

async function deleteEvent(id) {
    await db.query(
        "DELETE FROM events WHERE id = ?",
        [id]
    );
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};