const eventModel = require("../models/eventModel");

async function createEvent(req, res, next) {
    try {
        const {
            title,
            description,
            category_id,
            event_date,
            event_time,
            location,
            capacity
        } = req.body;

        if (
            !title ||
            !category_id ||
            !event_date ||
            !event_time ||
            !location ||
            !capacity
        ) {
            return res.status(400).json({
                message: "Please provide all required event details"
            });
        }

        if (Number(capacity) <= 0) {
            return res.status(400).json({
                message: "Capacity must be greater than 0"
            });
        }

        const eventId = await eventModel.createEvent({
            title,
            description: description || null,
            category_id,
            event_date,
            event_time,
            location,
            capacity: Number(capacity),
            created_by: req.user.id
        });

        res.status(201).json({
            message: "Event created successfully",
            eventId
        });
    } catch (error) {
        next(error);
    }
}

async function getEvents(req, res, next) {
    try {
        const {
            search = "",
            category = "",
            page = 1,
            limit = 10,
            sort = "date_asc"
        } = req.query;

        const result = await eventModel.getAllEvents({
            search,
            category,
            page: Number(page),
            limit: Number(limit),
            sort
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getEvent(req, res, next) {
    try {
        const event =
            await eventModel.getEventById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json(event);
    } catch (error) {
        next(error);
    }
}

async function updateEvent(req, res, next) {
    try {
        const {
            title,
            description,
            category_id,
            event_date,
            event_time,
            location,
            capacity
        } = req.body;

        if (
            !title ||
            !category_id ||
            !event_date ||
            !event_time ||
            !location ||
            !capacity
        ) {
            return res.status(400).json({
                message: "Please provide all required event details"
            });
        }

        await eventModel.updateEvent(
            req.params.id,
            {
                title,
                description: description || null,
                category_id,
                event_date,
                event_time,
                location,
                capacity
            }
        );

        res.json({
            message: "Event updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

async function deleteEvent(req, res, next) {
    try {
        await eventModel.deleteEvent(req.params.id);

        res.json({
            message: "Event deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
};