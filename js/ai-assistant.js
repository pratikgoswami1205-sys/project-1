const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

function handleEncryptEnter(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

window.useSuggestion = function(text) {
    chatInput.value = text;
    sendMessage();
};

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    // Add User Message
    addMessage(text, 'user');
    chatInput.value = '';

    // Show Typing Indicator
    const typingId = showTypingIndicator();

    // Simulate AI Response Delay
    setTimeout(() => {
        removeTypingIndicator(typingId);
        
        // Mock Responses
        let response = generateMockResponse(text);
        
        // Add AI Message with Typing Animation
        addTypingMessage(response, 'ai');
    }, 1500);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ai`;
    msgDiv.id = id;
    msgDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) {
        el.remove();
    }
}

function addTypingMessage(fullText, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    chatMessages.appendChild(msgDiv);
    
    let i = 0;
    const interval = setInterval(() => {
        msgDiv.textContent += fullText.charAt(i);
        i++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (i >= fullText.length) {
            clearInterval(interval);
        }
    }, 30); // Typing speed
}

function generateMockResponse(query) {
    const lower = query.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
        return "Hello there! How can I assist you with your studies today?";
    } else if (lower.includes('math') || lower.includes('calculate')) {
        return "I can help with math! Could you provide the specific equation or problem you're working on?";
    } else if (lower.includes('essay')) {
        return "Writing an essay? I suggest starting with a strong thesis statement. What is your topic?";
    } else if (lower.includes('science') || lower.includes('physics') || lower.includes('biology') || lower.includes('chemistry')) {
        return "Science is fascinating! Let me break down that concept for you. What specifically do you need help understanding?";
    } else {
        return "That's a great question. Let me concisely explain the key points related to your inquiry. Always remember to review your core notes as well!";
    }
}
