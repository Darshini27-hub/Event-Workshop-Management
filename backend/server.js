const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const categoryRoutes =
    require("./routes/categoryRoutes");

const eventRoutes =
    require("./routes/eventRoutes");

const registrationRoutes =
    require("./routes/registrationRoutes");

const userRoutes =
    require("./routes/userRoutes");

const errorMiddleware =
    require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Event & Workshop Management API is running"
    });
});

app.get("/api/test-db", async (req, res, next) => {
    try {
        const [result] = await db.query(
            "SELECT 1 AS result"
        );

        res.json({
            message: "Database connected successfully",
            result: result[0].result
        });
    } catch (error) {
        next(error);
    }
});

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/events", eventRoutes);

app.use(
    "/api/registrations",
    registrationRoutes
);

app.use("/api/users", userRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});