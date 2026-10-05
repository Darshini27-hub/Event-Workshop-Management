function errorMiddleware(err, req, res, next) {
    console.error(err);

    if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            message: "Duplicate value already exists"
        });
    }

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
            message: "Referenced record does not exist"
        });
    }

    res.status(500).json({
        message: err.message || "Internal server error"
    });
}

module.exports = errorMiddleware;