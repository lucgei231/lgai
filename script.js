// script.js

// Current AI type
let currentAIType = null;

// On page load
document.addEventListener('DOMContentLoaded', () => {
    showAISelection();
});

// Show AI Selection
function showAISelection() {
    document.getElementById('ai-selection').style.display = 'block';
    document.getElementById('chat-container').style.display = 'none';
}

// AI Type Selection
document.querySelectorAll('.ai-option').forEach(button => {
    button.addEventListener('click', () => {
        currentAIType = button.getAttribute('data-ai');
        loadChatInterface();
    });
});

// Load Chat Interface
function loadChatInterface() {
    document.getElementById('ai-selection').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    initializeAI();
}

// Initialize AI
function initializeAI() {
    document.getElementById('messages').innerHTML = '';
    appendMessage('LGAI', `Hello! How can I assist you today?`, 'ai-message');
}

// Chat Form Submission
document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = document.getElementById('user-input').value.trim();
    if (userMessage === '') return;

    appendMessage('You', userMessage, 'user-message');
    document.getElementById('user-input').value = '';
    const aiResponse = getAIResponse(userMessage);
    appendMessage('LGAI', aiResponse, 'ai-message');
    scrollToBottom();
});

// Get AI Response Based on AI Type
function getAIResponse(userMessage) {
    let aiResponse = '';
    if (currentAIType === 'coding-helper') {
        aiResponse = codingHelperResponse(userMessage);
    } else if (currentAIType === 'game-ai') {
        aiResponse = gameAIResponse(userMessage);
    } else if (currentAIType === 'companion') {
        aiResponse = companionResponse(userMessage);
    }
    return aiResponse;
}

// Coding Helper Responses
function codingHelperResponse(message) {
    if (message.includes('html')) {
        return 'HTML is the standard markup language for creating web pages. Here is an example of a basic HTML structure:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n</body>\n</html>\n```';
    } else if (message.includes('css')) {
        return 'CSS is used to style and layout web pages. Here is an example of CSS styling:\n\n```css\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: #6200ea;\n}\n```';
    } else if (message.includes('javascript')) {
        return 'JavaScript adds interactivity to web pages. Here is an example of JavaScript code to change the content of an HTML element:\n\n```javascript\ndocument.getElementById("demo").innerHTML = "Hello JavaScript!";\n```';
    } else {
        return 'Can you provide more details about your coding question?';
    }
}

// Game AI Responses
function gameAIResponse(message) {
    return 'Welcome to the adventure! Choose your path: forest or cave?';
}

// Companion Responses
function companionResponse(message) {
    const responses = [
        'Tell me more about that.',
        'How does that make you feel?',
        'I see. What else is on your mind?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Append Message to Chat
function appendMessage(sender, message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    document.getElementById('messages').appendChild(messageDiv);
}

// Scroll to Bottom of Chat
function scrollToBottom() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
