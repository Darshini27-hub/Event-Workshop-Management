const registrationService =
    require("../services/registrationService");

const registrationModel =
    require("../models/registrationModel");

async function registerForEvent(req, res, next) {
    try {
        const { event_id } = req.body;

        if (!event_id) {
            return res.status(400).json({
                message: "Event ID is required"
            });
        }

        await registrationService.registerUserForEvent(
            req.user.id,
            event_id
        );

        res.status(201).json({
            message: "Successfully registered for event"
        });
    } catch (error) {
        next(error);
    }
}

async function cancelRegistration(req, res, next) {
    try {
        await registrationService.cancelUserRegistration(
            req.user.id,
            req.params.id
        );

        res.json({
            message: "Registration cancelled successfully"
        });
    } catch (error) {
        next(error);
    }
}

async function getMyRegistrations(req, res, next) {
    try {
        const registrations =
            await registrationModel.getMyRegistrations(
                req.user.id
            );

        res.json(registrations);
    } catch (error) {
        next(error);
    }
}

async function getAllRegistrations(req, res, next) {
    try {
        const registrations =
            await registrationModel.getAllRegistrations();

        res.json(registrations);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerForEvent,
    cancelRegistration,
    getMyRegistrations,
    getAllRegistrations
};