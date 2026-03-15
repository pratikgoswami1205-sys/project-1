// CGPA Calculator Logic
let subjects = [];

window.addSubject = function() {
    const nameInput = document.querySelector('.subject-name');
    const gradeInput = document.querySelector('.grade-points');
    const creditsInput = document.querySelector('.credits');
    
    const name = nameInput.value || `Subject ${subjects.length + 1}`;
    const grade = parseFloat(gradeInput.value);
    const credits = parseInt(creditsInput.value);

    if (!isNaN(grade) && !isNaN(credits)) {
        subjects.push({ name, grade, credits });
        renderSubjects();
        // Keep inputs but clear values for next entry
        gradeInput.value = '';
        creditsInput.value = '';
        nameInput.value = '';
        nameInput.focus();
        calculateCGPA();
    } else {
        alert('Please enter valid grade points and credits.');
    }
};

function renderSubjects() {
    const list = document.getElementById('subjects-list');
    if (!list) return;
    
    list.innerHTML = subjects.map((s, i) => `
        <div class="subject-item glass animate-fade" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; margin-bottom: 0.8rem; border-radius: 16px; opacity: 1;">
            <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 600; color: var(--text-main);">${s.name}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted);">${s.grade} GP • ${s.credits} Credits</span>
            </div>
            <button onclick="removeSubject(${i})" style="background: rgba(255, 71, 87, 0.1); border: none; color: #ff4757; width: 36px; height: 36px; border-radius: 10px; cursor: pointer; transition: var(--transition);">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

window.removeSubject = function(index) {
    subjects.splice(index, 1);
    renderSubjects();
    calculateCGPA();
};

function calculateCGPA() {
    const resultDisplay = document.getElementById('cgpa-result');
    if (!resultDisplay) return;

    if (subjects.length === 0) {
        resultDisplay.innerText = '0.00';
        return;
    }
    const totalPoints = subjects.reduce((sum, s) => sum + (s.grade * s.credits), 0);
    const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
    const cgpa = (totalPoints / totalCredits).toFixed(2);
    
    // Animate the number
    animateValue(resultDisplay, parseFloat(resultDisplay.innerText), parseFloat(cgpa), 500);
}

// Percentage Calculator (Instant Feedback)
window.initPercentageCalc = function() {
    const obtained = document.getElementById('obtained-marks');
    const total = document.getElementById('total-marks');
    const result = document.getElementById('percentage-result');

    if (!obtained || !total || !result) return;

    const calc = () => {
        const o = parseFloat(obtained.value);
        const t = parseFloat(total.value);
        if (!isNaN(o) && !isNaN(t) && t > 0) {
            const p = ((o / t) * 100).toFixed(2);
            result.innerText = p + '%';
            result.style.color = 'var(--primary)';
        } else {
            result.innerText = '0.00%';
            result.style.color = 'var(--text-muted)';
        }
    };

    obtained.addEventListener('input', calc);
    total.addEventListener('input', calc);
};

// Word Counter (Real-time)
window.initWordCounter = function() {
    const text = document.getElementById('text-input');
    const words = document.getElementById('word-count');
    const chars = document.getElementById('char-count');

    if (!text || !words || !chars) return;

    text.addEventListener('input', () => {
        const val = text.value.trim();
        const wordCount = val ? val.split(/\s+/).length : 0;
        words.innerText = wordCount;
        chars.innerText = text.value.length;
    });
};

// Pomodoro Timer Logic
let timerInterval;
let defaultTime = 25 * 60;
let timeLeft = defaultTime;
let isRunning = false;

window.startTimer = function() {
    if (isRunning) return;
    isRunning = true;
    document.getElementById('timer-display').style.color = 'var(--primary)';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            document.getElementById('timer-display').style.color = '#ff4757';
            alert('Study session complete! Take a break.');
            resetTimer();
        }
    }, 1000);
};

window.pauseTimer = function() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('timer-display').style.color = 'var(--text-main)';
};

window.resetTimer = function() {
    pauseTimer();
    timeLeft = defaultTime;
    updateTimerDisplay();
};

function updateTimerDisplay() {
    const display = document.getElementById('timer-display');
    if (!display) return;
    
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Stopwatch Logic
let stopwatchInterval;
let stopwatchTime = 0;
let isStopwatchRunning = false;

window.startStopwatch = function() {
    if (isStopwatchRunning) return;
    isStopwatchRunning = true;
    document.getElementById('stopwatch-display').style.color = 'var(--primary)';
    
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay();
    }, 1000);
};

window.pauseStopwatch = function() {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    document.getElementById('stopwatch-display').style.color = 'var(--text-main)';
};

window.resetStopwatch = function() {
    pauseStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
};

function updateStopwatchDisplay() {
    const display = document.getElementById('stopwatch-display');
    if (!display) return;
    
    const hrs = Math.floor(stopwatchTime / 3600);
    const mins = Math.floor((stopwatchTime % 3600) / 60);
    const secs = stopwatchTime % 60;
    display.innerText = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Unit Converter Logic
window.convertUnits = function() {
    const input = document.getElementById('unit-input');
    const from = document.getElementById('unit-from').value;
    const to = document.getElementById('unit-to').value;
    const result = document.getElementById('unit-result');
    const val = parseFloat(input.value);

    if (isNaN(val)) return;

    let meters = val;
    if (from === 'km') meters = val * 1000;
    if (from === 'cm') meters = val / 100;

    let finalVal = meters;
    if (to === 'km') finalVal = meters / 1000;
    if (to === 'cm') finalVal = meters * 100;

    result.innerText = finalVal.toFixed(2) + ' ' + to;
};

// Age Calculator Logic
window.calculateAge = function() {
    const birthDateInput = document.getElementById('birth-date').value;
    const result = document.getElementById('age-result');
    if (!birthDateInput) return;

    const birthDate = new Date(birthDateInput);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    result.innerText = `You are ${age} years old`;
};

// Text Case Converter Logic
window.convertCase = function(type) {
    const input = document.getElementById('case-input');
    let text = input.value;

    switch(type) {
        case 'upper': text = text.toUpperCase(); break;
        case 'lower': text = text.toLowerCase(); break;
        case 'title':
            text = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            break;
        case 'sentence':
            text = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
            break;
    }
    input.value = text;
};

// Character Counter Logic
document.addEventListener('input', (e) => {
    if (e.target.id === 'char-input') {
        const text = e.target.value;
        document.getElementById('chars-total').innerText = text.length;
        document.getElementById('chars-spaces').innerText = (text.match(/ /g) || []).length;
    }
});

// To-Do List Logic
let todos = JSON.parse(localStorage.getItem('hub-todos')) || [];

window.addTodo = function(inputElId = 'todo-input') {
    const input = document.getElementById(inputElId);
    if (!input || !input.value.trim()) return;
    todos.push({ text: input.value, completed: false, date: new Date().toISOString() });
    input.value = '';
    syncProductivityData();
};

window.toggleTodo = function(index) {
    todos[index].completed = !todos[index].completed;
    syncProductivityData();
};

window.removeTodo = function(index) {
    todos.splice(index, 1);
    syncProductivityData();
};

window.syncProductivityData = function() {
    saveTodos();
    renderTodos();
    if (window.renderDashTasks) window.renderDashTasks();
    if (window.updateWeeklyProgress) window.updateWeeklyProgress();
};

function renderTodos() {
    const list = document.getElementById('todo-list');
    if (!list) return;
    list.innerHTML = todos.map((t, i) => `
        <div class="glass" style="display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 12px; gap: 1rem; border: 1px solid ${t.completed ? 'var(--primary-glow)' : 'var(--glass-border)'}">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTodo(${i})" style="width: 20px; height: 20px; margin: 0; cursor: pointer;">
            <span style="flex: 1; ${t.completed ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${t.text}</span>
            <i class="fas fa-trash" onclick="removeTodo(${i})" style="cursor: pointer; color: #ff4757; opacity: 0.7;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7"></i>
        </div>
    `).join('') || '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">No tasks yet.</p>';
}

function saveTodos() { localStorage.setItem('hub-todos', JSON.stringify(todos)); }

// Study Statistics Logic
window.getStudyStats = function() {
    return JSON.parse(localStorage.getItem('hub-study-stats')) || {
        todayHours: 0,
        weeklyHours: [0, 0, 0, 0, 0, 0, 0], // Mon-Sun
        lastUpdate: new Date().toDateString()
    };
};

window.saveStudyStats = function(stats) {
    localStorage.setItem('hub-study-stats', JSON.stringify(stats));
    if (window.renderStudyData) window.renderStudyData();
    if (window.updateWeeklyProgress) window.updateWeeklyProgress();
};

window.logStudyHours = function(hours) {
    let stats = getStudyStats();
    const today = new Date();
    const dayIndex = (today.getDay() + 6) % 7; // Convert Sun-Sat(0-6) to Mon-Sun(0-6)
    
    // Reset if it's a new day
    if (stats.lastUpdate !== today.toDateString()) {
        stats.todayHours = 0;
        stats.lastUpdate = today.toDateString();
        // If it's a new week, we might want to reset the whole array, but for now just update today
    }
    
    stats.todayHours += parseFloat(hours);
    stats.weeklyHours[dayIndex] += parseFloat(hours);
    saveStudyStats(stats);
};

// Password Generator Logic
window.generatePassword = function() {
    const length = document.getElementById('pass-length').value;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById('pass-result').innerText = retVal;
};

window.copyPassword = function() {
    const pass = document.getElementById('pass-result').innerText;
    if (pass === '********') return;
    navigator.clipboard.writeText(pass);
    alert('Password copied!');
};

// Utility: Animate value change
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = (progress * (end - start) + start).toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize all on load
document.addEventListener('DOMContentLoaded', () => {
    initPercentageCalc();
    initWordCounter();
    updateTimerDisplay();
    renderTodos();
});
