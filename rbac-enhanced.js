// rbac-enhanced.js

// Enhanced Role-Based Access Control

// Define roles
const roles = {
    admin: 'admin',
    user: 'user',
    guest: 'guest',
};

// Define permissions 
const permissions = {
    [roles.admin]: ['create', 'read', 'update', 'delete'],
    [roles.user]: ['read'],
    [roles.guest]: ['read'],
};

// Permission matrix 
const permissionMatrix = {
    admin: {
        create: true,
        read: true,
        update: true,
        delete: true,
    },
    user: {
        create: false,
        read: true,
        update: false,
        delete: false,
    },
    guest: {
        create: false,
        read: true,
        update: false,
        delete: false,
    },
};

// Function to check permissions
function hasPermission(role, action) {
    return permissionMatrix[role][action] || false;
}

// Function to hide admin-only features
function hideAdminFeatures(role) {
    if (role === roles.admin) {
        // Show admin features
    } else {
        // Hide admin features
        console.log('Admin features hidden for: ', role);
    }
}

// Exporting functions for external use
module.exports = { hasPermission, hideAdminFeatures };