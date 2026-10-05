const registrationModel =
    require("../models/registrationModel");

async function registerUserForEvent(userId, eventId) {
    return registrationModel.registerForEvent(
        userId,
        eventId
    );
}

async function cancelUserRegistration(
    userId,
    registrationId
) {
    return registrationModel.cancelRegistration(
        userId,
        registrationId
    );
}

module.exports = {
    registerUserForEvent,
    cancelUserRegistration
};