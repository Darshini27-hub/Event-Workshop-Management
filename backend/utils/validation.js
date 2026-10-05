function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return password && password.length >= 6;
}

module.exports = {
    isValidEmail,
    isValidPassword
};