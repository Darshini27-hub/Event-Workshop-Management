const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const authenticateToken =
    require("../middleware/authMiddleware");

const { requireAdmin } =
    require("../middleware/roleMiddleware");

router.get(
    "/",
    authenticateToken,
    requireAdmin,
    getUsers
);

router.get(
    "/:id",
    authenticateToken,
    requireAdmin,
    getUser
);

router.put(
    "/:id",
    authenticateToken,
    requireAdmin,
    updateUser
);

router.delete(
    "/:id",
    authenticateToken,
    requireAdmin,
    deleteUser
);

module.exports = router;