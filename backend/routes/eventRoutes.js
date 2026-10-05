const express = require("express");
const router = express.Router();

const {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

const authenticateToken =
    require("../middleware/authMiddleware");

const { requireAdmin } =
    require("../middleware/roleMiddleware");

router.get("/", getEvents);
router.get("/:id", getEvent);

router.post(
    "/",
    authenticateToken,
    requireAdmin,
    createEvent
);

router.put(
    "/:id",
    authenticateToken,
    requireAdmin,
    updateEvent
);

router.delete(
    "/:id",
    authenticateToken,
    requireAdmin,
    deleteEvent
);

module.exports = router;