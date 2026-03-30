// session-manager.js

const jwt = require('jsonwebtoken');
const sessionStore = {}; // Example session store 

function createSession(userId) {
    const token = jwt.sign({ userId }, 'yourSecret', { expiresIn: '1h' });
    sessionStore[userId] = token;
    return token;
}

function validateSession(token) {
    try {
        const decoded = jwt.verify(token, 'yourSecret');
        return !!sessionStore[decoded.userId] && token === sessionStore[decoded.userId];
    } catch (err) {
        return false;
    }
}

function expireSession(userId) {
    delete sessionStore[userId];
}

module.exports = { createSession, validateSession, expireSession };