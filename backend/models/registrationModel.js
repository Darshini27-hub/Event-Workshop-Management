const db = require("../config/db");

async function registerForEvent(userId, eventId) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [events] = await connection.query(
            `SELECT *
             FROM events
             WHERE id = ?
             FOR UPDATE`,
            [eventId]
        );

        if (events.length === 0) {
            throw new Error("Event not found");
        }

        const event = events[0];

        if (event.available_seats <= 0) {
            throw new Error("No seats available");
        }

        const [existing] = await connection.query(
            `SELECT *
             FROM registrations
             WHERE user_id = ?
             AND event_id = ?`,
            [userId, eventId]
        );

        if (
            existing.length > 0 &&
            existing[0].status === "registered"
        ) {
            throw new Error(
                "You are already registered for this event"
            );
        }

        if (existing.length > 0) {
            await connection.query(
                `UPDATE registrations
                 SET status = 'registered',
                     registration_date = CURRENT_TIMESTAMP
                 WHERE id = ?`,
                [existing[0].id]
            );
        } else {
            await connection.query(
                `INSERT INTO registrations
                 (user_id, event_id, status)
                 VALUES (?, ?, 'registered')`,
                [userId, eventId]
            );
        }

        await connection.query(
            `UPDATE events
             SET available_seats = available_seats - 1
             WHERE id = ?`,
            [eventId]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function cancelRegistration(userId, registrationId) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [registrations] = await connection.query(
            `SELECT *
             FROM registrations
             WHERE id = ?
             AND user_id = ?`,
            [registrationId, userId]
        );

        if (registrations.length === 0) {
            throw new Error("Registration not found");
        }

        const registration = registrations[0];

        if (registration.status === "cancelled") {
            throw new Error("Registration already cancelled");
        }

        await connection.query(
            `UPDATE registrations
             SET status = 'cancelled'
             WHERE id = ?`,
            [registrationId]
        );

        await connection.query(
            `UPDATE events
             SET available_seats = available_seats + 1
             WHERE id = ?`,
            [registration.event_id]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getMyRegistrations(userId) {
    const [rows] = await db.query(
        `SELECT
            r.id,
            r.registration_date,
            r.status,
            e.title,
            e.event_date,
            e.event_time,
            e.location,
            c.name AS category
         FROM registrations r
         INNER JOIN events e
             ON r.event_id = e.id
         INNER JOIN categories c
             ON e.category_id = c.id
         WHERE r.user_id = ?
         ORDER BY r.registration_date DESC`,
        [userId]
    );

    return rows;
}

async function getAllRegistrations() {
    const [rows] = await db.query(
        `SELECT
            r.id,
            r.registration_date,
            r.status,
            u.name AS user_name,
            u.email,
            e.title AS event_title,
            e.event_date
         FROM registrations r
         INNER JOIN users u
             ON r.user_id = u.id
         INNER JOIN events e
             ON r.event_id = e.id
         ORDER BY r.registration_date DESC`
    );

    return rows;
}

module.exports = {
    registerForEvent,
    cancelRegistration,
    getMyRegistrations,
    getAllRegistrations
};