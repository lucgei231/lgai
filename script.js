// script.js

let users = JSON.parse(localStorage.getItem('lgai-users')) || {};

// Current logged-in user
let currentUser = null;

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if a user session exists
    const sessionUser = localStorage.getItem('lgai-currentUser');
    if (sessionUser) {
        currentUser = JSON.parse(sessionUser);
        if (currentUser.aiType) {
            loadChatInterface();
        } else {
            showAISelection();
        }
    } else {
        showAuthContainer();
    }
});

// Show Authentication Container
function showAuthContainer() {
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('ai-selection').style.display = 'none';
    document.getElementById('chat-container').style.display = 'none';
}

// Toggle between Sign Up and Login forms
document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

// Sign Up
document.getElementById('signup-button').addEventListener('click', () => {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;
    if (username === '' || password === '') {
        alert('Please enter a username and password.');
        return;
    }
    if (users[username]) {
        alert('Username already exists.');
        return;
    }
    // Save user
    users[username] = { password: password };
    localStorage.setItem('lgai-users', JSON.stringify(users));
    // Log in user
    currentUser = { username: username };
    localStorage.setItem('lgai-currentUser', JSON.stringify(currentUser));
    showAISelection();
});

// Log In
document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    if (username === '' || password === '') {
        alert('Please enter your username and password.');
        return;
    }
    if (!users[username] || users[username].password !== password) {
        alert('Invalid username or password.');
        return;
    }
    // Log in user
    currentUser = { username: username, aiType: users[username].aiType };
    localStorage.setItem('lgai-currentUser', JSON.stringify(currentUser));
    if (currentUser.aiType) {
        loadChatInterface();
    } else {
        showAISelection();
    }
});

// Show AI Selection
function showAISelection() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('ai-selection').style.display = 'block';
}

// AI Type Selection
document.querySelectorAll('.ai-option').forEach(button => {
    button.addEventListener('click', () => {
        const aiType = button.getAttribute('data-ai');
        currentUser.aiType = aiType;
        users[currentUser.username].aiType = aiType;
        localStorage.setItem('lgai-users', JSON.stringify(users));
        localStorage.setItem('lgai-currentUser', JSON.stringify(currentUser));
        loadChatInterface();
    });
});

// Load Chat Interface
function loadChatInterface() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('ai-selection').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    initializeAI();
}

// Log Out
document.getElementById('logout-button
