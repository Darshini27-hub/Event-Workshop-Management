const express = require("express");
const router = express.Router();

const {
    registerForEvent,
    cancelRegistration,
    getMyRegistrations,
    getAllRegistrations
} = require("../controllers/registrationController");

const authenticateToken =
    require("../middleware/authMiddleware");

const { requireAdmin } =
    require("../middleware/roleMiddleware");

router.post(
    "/",
    authenticateToken,
    registerForEvent
);

router.get(
    "/my",
    authenticateToken,
    getMyRegistrations
);

router.delete(
    "/:id",
    authenticateToken,
    cancelRegistration
);

router.get(
    "/",
    authenticateToken,
    requireAdmin,
    getAllRegistrations
);

module.exports = router;