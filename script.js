// script.js

// Current AI type
let currentAIType = null;
let adventureState = {};

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
    } else if (currentAIType === 'choose-your-own-adventure') {
        aiResponse = adventureResponse(userMessage);
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

// Choose Your Own Adventure Responses
function adventureResponse(message) {
    if (!adventureState.step) {
        adventureState.step = 1;
        return 'You find yourself at the entrance of a mysterious forest. Do you enter the forest or turn back?';
    }

    if (adventureState.step === 1) {
        if (message.toLowerCase().includes('enter')) {
            adventureState.step = 2;
            return 'You step into the forest and hear the rustling of leaves. Do you investigate the sound or continue on the path?';
        } else if (message.toLowerCase().includes('turn back')) {
            adventureState.step = 'end';
            return 'You decide it\'s safer to turn back. Adventure ends here. Refresh the page to start again.';
        } else {
            return 'Please choose to "enter" the forest or "turn back".';
        }
    }

    if (adventureState.step === 2) {
        if (message.toLowerCase().includes('investigate')) {
            adventureState.step = 3;
            return 'You find a hidden treasure chest! Do you open it or leave it?';
        } else if (message.toLowerCase().includes('continue')) {
            adventureState.step = 4;
            return 'You come across a wise old man. Do you ask him for advice or ignore him?';
        } else {
            return 'Please choose to "investigate" the sound or "continue" on the path.';
        }
    }

    if (adventureState.step === 3) {
        if (message.toLowerCase().includes('open')) {
            adventureState.step = 'end';
            return 'You open the chest and find gold and jewels! You\'ve completed the adventure successfully. Refresh the page to start again.';
        } else if (message.toLowerCase
