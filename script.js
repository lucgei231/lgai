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
        // Reset adventure state if choosing adventure AI
        if (currentAIType === 'choose-your-own-adventure') {
            adventureState = { step: 0 };
        }
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
    if (currentAIType === 'choose-your-own-adventure') {
        const aiResponse = adventureResponse('');
        appendMessage('LGAI', aiResponse, 'ai-message');
    } else {
        appendMessage('LGAI', 'Hello! How can I assist you today?', 'ai-message');
    }
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
    message = message.toLowerCase();
    if (message.includes('html')) {
        return 'HTML is the standard markup language for creating web pages. Here is an example of a basic HTML structure:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n</head>\n<body>\n    <h1>This is a Heading</h1>\n    <p>This is a paragraph.</p>\n</body>\n</html>\n```';
    } else if (message.includes('css')) {
        return 'CSS is used to style and layout web pages. Here is an example of CSS styling:\n\n```css\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #6200ea;\n}\n```';
    } else if (message.includes('javascript')) {
        return 'JavaScript adds interactivity to web pages. Here is an example of JavaScript code to change the content of an HTML element:\n\n```javascript\ndocument.getElementById("demo").innerHTML = "Hello JavaScript!";\n```';
    } else {
        return 'Can you provide more details about your coding question?';
    }
}

// Game AI Responses
function gameAIResponse(message) {
    // Placeholder for game AI
    return 'Welcome to the game! This feature is under development.';
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
    message = message.toLowerCase();

    if (!adventureState.step || adventureState.step === 0) {
        adventureState.step = 1;
        return 'You find yourself at the entrance of a mysterious forest. Do you "enter" the forest or "turn back"?';
    }

    if (adventureState.step === 1) {
        if (message.includes('enter')) {
            adventureState.step = 2;
            return 'You step into the forest and hear rustling leaves. Do you "investigate" the sound or "continue" on the path?';
        } else if (message.includes('turn back')) {
            adventureState.step = 'end';
            return 'You decide it\'s safer to turn back. The adventure ends here. Refresh the page to start again.';
        } else {
            return 'Please choose to "enter" the forest or "turn back".';
        }
    }

    if (adventureState.step === 2) {
        if (message.includes('investigate')) {
            adventureState.step = 3;
            return 'You find a hidden treasure chest! Do you "open" it or "leave" it?';
        } else if (message.includes('continue')) {
            adventureState.step = 4;
            return 'You come across a wise old man. Do you "ask" him for advice or "ignore" him?';
        } else {
            return 'Please choose to "investigate" the sound or "continue" on the path.';
        }
    }

    if (adventureState.step === 3) {
        if (message.includes('open')) {
            adventureState.step = 'end';
            return 'You open the chest and find gold and jewels! You\'ve completed the adventure successfully. Refresh the page to start again.';
        } else if (message.includes('leave')) {
            adventureState.step = 'end';
            return 'You decide not to risk it and leave the chest untouched. The adventure ends here. Refresh the page to start again.';
        } else {
            return 'Do you want to "open" the chest or "leave" it?';
        }
    }

    if (adventureState.step === 4) {
        if (message.includes('ask')) {
            adventureState.step = 'end';
            return 'The wise old man shares profound wisdom with you. You feel enlightened. The adventure ends here. Refresh the page to start again.';
        } else if (message.includes('ignore')) {
            adventureState.step = 'end';
            return 'You walk past the old man and soon find your way out of the forest. The adventure ends here. Refresh the page to start again.';
        } else {
            return 'Do you want to "ask" the old man for advice or "ignore" him?';
        }
    }

    if (adventureState.step === 'end') {
        return 'The adventure has ended. Please refresh the page to start a new adventure.';
    }

    return 'I didn\'t understand that. Please try again.';
}

// Append Message to Chat
function appendMessage(sender, message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    // Replace line breaks with <br> and preserve formatting
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message.replace(/\n/g, '<br>')}`;
    document.getElementById('messages').appendChild(messageDiv);
    scrollToBottom();
}

// Scroll to Bottom of Chat
function scrollToBottom() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
