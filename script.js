// script.js

// Simulated database using localStorage
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
document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('lgai-currentUser');
    currentUser = null;
    showAuthContainer();
});

// Initialize AI
function initializeAI() {
    document.getElementById('messages').innerHTML = '';
    appendMessage('LGAI', `Hello ${currentUser.username}! How can I assist you today?`, 'ai-message');
}

// Chat Form Submission
document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = document.getElementById('user-input').value.trim();
    if (userMessage === '') return;

    appendMessage('You', userMessage, 'user-message');
    document.getElementById('user-input').value = '';
    const aiResponse = processMessage(userMessage);
    appendMessage('LGAI', aiResponse, 'ai-message');
    scrollToBottom();
});

// Process User Message Based on AI Type
function processMessage(userMessage) {
    let aiResponse = '';
    if (currentUser.aiType === 'coding-helper') {
        aiResponse = codingHelperAI(userMessage);
    } else if (currentUser.aiType === 'game-ai') {
        aiResponse = gameAI(userMessage);
    } else if (currentUser.aiType === 'companion') {
        aiResponse = companionAI(userMessage);
    }
    return aiResponse;
}

// Message Functions
function appendMessage(sender, message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    document.getElementById('messages').appendChild(messageDiv);
}

function scrollToBottom() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// AI Behaviors

// Coding Helper AI
function codingHelperAI(userMessage) {
    if (userMessage.toLowerCase().includes('html')) {
        return 'HTML is the standard markup language for creating web pages.';
    } else if (userMessage.toLowerCase().includes('css')) {
        return 'CSS is used to style HTML elements and make web pages look attractive.';
    } else if (userMessage.toLowerCase().includes('javascript')) {
        return 'JavaScript adds interactivity to web pages.';
    } else {
        return 'Can you tell me more about your coding question?';
    }
}

// Game AI
let gameState = {};

function gameAI(userMessage) {
    if (!gameState.started) {
        gameState = { started: true, step: 1 };
        return 'Welcome to the adventure! You find yourself at a crossroads. Do you go left or right?';
    } else if (gameState.step === 1) {
        if (userMessage.toLowerCase().includes('left')) {
            gameState.step = 2;
            return 'You encounter a friendly dragon. Do you talk to it or run away?';
        } else if (userMessage.toLowerCase().includes('right')) {
            gameState.step = 3;
            return 'You find a treasure chest. Do you open it or ignore it?';
        } else {
            return 'Please choose to go left or right.';
        }
    } else {
        return 'Your adventure continues... (This is a simplified example.)';
    }
}

// Companion AI
function companionAI(userMessage) {
    const responses = [
        'That sounds interesting, tell me more!',
        'I\'m here to listen.',
        'How does that make you feel?',
        'What else would you like to discuss?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
