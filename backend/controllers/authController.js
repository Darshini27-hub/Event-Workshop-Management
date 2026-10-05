const authService = require("../services/authService");
const {
    isValidEmail,
    isValidPassword
} = require("../utils/validation");

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters"
            });
        }

        const userId = await authService.registerUser(
            name,
            email,
            password
        );

        res.status(201).json({
            message: "User registered successfully",
            userId
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await authService.loginUser(
            email,
            password
        );

        res.status(200).json({
            message: "Login successful",
            ...result
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};