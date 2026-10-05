const express = require("express");
const router = express.Router();

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const authenticateToken =
    require("../middleware/authMiddleware");

const { requireAdmin } =
    require("../middleware/roleMiddleware");

router.get("/", getCategories);
router.get("/:id", getCategory);

router.post(
    "/",
    authenticateToken,
    requireAdmin,
    createCategory
);

router.put(
    "/:id",
    authenticateToken,
    requireAdmin,
    updateCategory
);

router.delete(
    "/:id",
    authenticateToken,
    requireAdmin,
    deleteCategory
);

module.exports = router;