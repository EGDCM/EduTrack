// auth-utils.js

/**
 * Secure authentication utilities
 *
 * This module provides functions for password hashing, token validation,
 * CSRF protection, input sanitization, rate limiting, and password strength validation.
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const sanitizer = require('sanitizer');

// Password hashing
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Token validation
function validateToken(token) {
    try {
        return jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace with your secret key
    } catch (error) {
        return null;
    }
}

// CSRF protection middleware
function csrfProtection(req, res, next) {
    const token = req.headers['csrf-token'];
    if (token !== req.session.csrfToken) {
        return res.status(403).send('CSRF token invalid');
    }
    next();
}

// Input sanitization
function sanitizeInput(input) {
    return sanitizer.sanitize(input);
}

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Password strength validation
function validatePasswordStrength(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
}

module.exports = { hashPassword, validateToken, csrfProtection, sanitizeInput, limiter, validatePasswordStrength };