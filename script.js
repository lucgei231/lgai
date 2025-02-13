// script.js

// Load users from localStorage or initialize an empty object
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
        return 'HTML is the standard markup language for creating web pages. Do you need help with tags or structure?';
    } else if (userMessage.toLowerCase().includes('css')) {
        return 'CSS styles your HTML elements. Are you working with layouts or animations?';
    } else if (userMessage.toLowerCase().includes('javascript')) {
        return 'JavaScript brings interactivity to your web pages. Let me know if you need help with functions or events.';
    } else {
        return 'Can you tell me more about your coding question?';
    }
}

// Game AI
let gameState = {};

function gameAI(userMessage) {
    if (!gameState[currentUser.username]) {
        gameState[currentUser.username] = { step: 1 };
        return 'Welcome to the adventure! You stand at a crossroads. Do you choose the left path or the right path?';
    }

    let game = gameState[currentUser.username];
    let response = '';

    if (game.step === 1) {
        if (userMessage.toLowerCase().includes('left')) {
            game.step = 2;
            response = 'You encounter a friendly dragon. Do you talk to it or walk away?';
        } else if (userMessage.toLowerCase().includes('right')) {
            game.step = 3;
            response = 'You find a hidden treasure chest. Do you open it or leave it?';
        } else {
            response = 'Please choose either the left path or the right path.';
        }
    } else if (game.step === 2) {
        if (userMessage.toLowerCase().includes('talk')) {
            game.step = 4;
            response = 'The dragon shares wisdom with you. You feel enlightened!';
        } else if (userMessage.toLowerCase().includes('walk away')) {
            game.step = 4;
            response = 'You continue your journey and find a peaceful meadow.';
        } else {
            response = 'Do you want to talk to the dragon or walk away?';
        }
    } else if (game.step === 3) {
        if (userMessage.toLowerCase().includes('open')) {
            game.step = 4;
            response = 'The chest is filled with gold! You are now wealthy.';
        } else if (userMessage.toLowerCase().includes('leave')) {
            game.step = 4;
            response = 'You walk away, feeling that some things are better left untouched.';
        } else {
            response = 'Will you open the chest or leave it?';
        }
    } else {
        response = 'Your adventure has concluded. Refresh the page to start a new journey!';
    }

    return response;
}

// Companion AI
function companionAI(userMessage) {
    const responses = [
        'That sounds interesting! Tell me more.',
        'I\'m here to listen whenever you need.',
        'How does that make you feel?',
        'What else is on your mind?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
