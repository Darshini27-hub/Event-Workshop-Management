const userModel = require("../models/userModel");

async function getUsers(req, res, next) {
    try {
        const users = await userModel.getAllUsers();

        res.json(users);
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res, next) {
    try {
        const user =
            await userModel.findUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const {
            name,
            email,
            role
        } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({
                message: "Name, email and role are required"
            });
        }

        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({
                message: "Role must be admin or user"
            });
        }

        await userModel.updateUser(
            req.params.id,
            name,
            email,
            role
        );

        res.json({
            message: "User updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        await userModel.deleteUser(req.params.id);

        res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
};