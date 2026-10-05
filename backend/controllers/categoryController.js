const categoryModel = require("../models/categoryModel");

async function createCategory(req, res, next) {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const id = await categoryModel.createCategory(
            name,
            description || null
        );

        res.status(201).json({
            message: "Category created successfully",
            categoryId: id
        });
    } catch (error) {
        next(error);
    }
}

async function getCategories(req, res, next) {
    try {
        const categories =
            await categoryModel.getAllCategories();

        res.json(categories);
    } catch (error) {
        next(error);
    }
}

async function getCategory(req, res, next) {
    try {
        const category =
            await categoryModel.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        await categoryModel.updateCategory(
            req.params.id,
            name,
            description || null
        );

        res.json({
            message: "Category updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

async function deleteCategory(req, res, next) {
    try {
        await categoryModel.deleteCategory(
            req.params.id
        );

        res.json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};