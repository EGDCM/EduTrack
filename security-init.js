// security-init.js

// Session Management
class SessionManager {
    constructor() {
        this.sessions = {};
    }

    createSession(userId) {
        const sessionId = this.generateSessionId();
        const expiration = Date.now() + 30 * 60 * 1000; // 30 minutes
        this.sessions[sessionId] = { userId, expiration };
        return sessionId;
    }

    getSession(sessionId) {
        const session = this.sessions[sessionId];
        if (session && session.expiration > Date.now()) {
            return session.userId;
        }
        return null;
    }

    generateSessionId() {
        return Math.random().toString(36).substring(2);
    }
}

// Device Fingerprinting
class DeviceFingerprint {
    constructor() {
        this.fingerprints = {};
    }

    generateFingerprint() {
        return JSON.stringify({
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenResolution: `${screen.width}x${screen.height}`
        });
    }

    storeFingerprint(userId) {
        const fingerprint = this.generateFingerprint();
        this.fingerprints[userId] = fingerprint;
        return fingerprint;
    }
}

// CSRF Protection
function csrfProtection(token) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    if (token !== csrfToken) {
        throw new Error('Invalid CSRF token');
    }
}

// Auto-Logout
function autoLogout() {
    setTimeout(() => {
        alert('You have been logged out due to inactivity.');
        // Add logic to logout the user
    }, 30 * 60 * 1000); // 30 minutes
}

// Activity Monitoring
class ActivityMonitor {
    constructor() {
        this.activities = [];
        this.startMonitoring();
    }

    startMonitoring() {
        document.addEventListener('click', this.recordActivity.bind(this));
        document.addEventListener('keypress', this.recordActivity.bind(this));
    }

    recordActivity(event) {
        this.activities.push({
            eventType: event.type,
            timestamp: Date.now()
        });
    }
}

// Exporting functions
export { SessionManager, DeviceFingerprint, csrfProtection, autoLogout, ActivityMonitor };