document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    // 1. Task Manager Logic
    window.renderDashTasks = () => {
        const dashTaskList = document.getElementById('dash-task-list');
        const taskBadge = document.getElementById('task-count-badge');
        const dashTasksDone = document.getElementById('dash-tasks-done');
        
        if (!dashTaskList) return;
        
        // Use 'todos' from tools.js
        const taskData = typeof todos !== 'undefined' ? todos : [];

        dashTaskList.innerHTML = taskData.map((t, i) => `
            <div class="glass animate-fade" style="display: flex; align-items: center; padding: 0.8rem; border-radius: 12px; gap: 0.8rem; border: 1px solid ${t.completed ? 'var(--primary-glow)' : 'rgba(255,255,255,0.05)'};">
                <div onclick="toggleTodo(${i})" style="width: 18px; height: 18px; border: 2px solid ${t.completed ? 'var(--primary)' : 'var(--text-muted)'}; border-radius: 5px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;">
                    ${t.completed ? '<i class="fas fa-check" style="font-size: 0.6rem; color: var(--primary);"></i>' : ''}
                </div>
                <span style="flex: 1; font-size: 0.85rem; ${t.completed ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${t.text}</span>
                <i class="fas fa-times" onclick="removeTodo(${i})" style="cursor: pointer; color: var(--text-muted); opacity: 0.4; font-size: 0.8rem;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.4"></i>
            </div>
        `).join('') || '<p style="color: var(--text-muted); font-size: 0.8rem; text-align: center; margin-top: 1rem;">No tasks yet.</p>';

        const pending = taskData.filter(t => !t.completed).length;
        if (taskBadge) taskBadge.innerText = `${pending} Pending`;
        
        const doneCount = taskData.filter(t => t.completed).length;
        if (dashTasksDone) dashTasksDone.innerText = doneCount;
    };

    window.addDashTask = () => {
        const input = document.getElementById('dash-task-input');
        if (!input || !input.value.trim()) return;
        if (typeof addTodo === 'function') {
            addTodo('dash-task-input');
        }
    };

    // 2. Study Tracker Logic
    window.renderStudyData = () => {
        const studyDisplay = document.getElementById('dash-study-hours');
        if (!studyDisplay) return;
        const stats = typeof getStudyStats === 'function' ? getStudyStats() : { todayHours: 0 };
        studyDisplay.innerText = stats.todayHours + 'h';
    };

    window.updateStudyHours = () => {
        const input = document.getElementById('study-hours-input');
        if (!input) return;
        const val = parseFloat(input.value);
        if (isNaN(val) || val < 0) return;
        
        if (typeof logStudyHours === 'function') {
            logStudyHours(val);
            input.value = '';
        }
    };

    // 3. Pomodoro Mini Logic
    let pomoSeconds = 25 * 60;
    let pomoInterval = null;
    let isPomoRunning = false;
    const pomoDisplay = document.getElementById('dash-pomo-display');
    const pomoBtn = document.getElementById('dash-pomo-btn');

    window.toggleDashPomo = () => {
        if (!pomoBtn) return;
        if (isPomoRunning) {
            clearInterval(pomoInterval);
            pomoBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            pomoInterval = setInterval(() => {
                pomoSeconds--;
                updatePomoUI();
                if (pomoSeconds <= 0) {
                    clearInterval(pomoInterval);
                    alert('Focus session complete!');
                    resetDashPomo();
                }
            }, 1000);
            pomoBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPomoRunning = !isPomoRunning;
    };

    window.resetDashPomo = () => {
        clearInterval(pomoInterval);
        isPomoRunning = false;
        pomoSeconds = 25 * 60;
        updatePomoUI();
        if (pomoBtn) pomoBtn.innerHTML = '<i class="fas fa-play"></i>';
    };

    function updatePomoUI() {
        if (!pomoDisplay) return;
        const m = Math.floor(pomoSeconds / 60);
        const s = pomoSeconds % 60;
        pomoDisplay.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // 4. Quick Note Logic
    const noteInput = document.getElementById('dash-note-input');
    if (noteInput) {
        noteInput.value = localStorage.getItem('dash-note') || '';
        window.saveDashNote = () => {
            localStorage.setItem('dash-note', noteInput.value);
            // Create a custom toast or simple alert
            const btn = event.target;
            const originalText = btn.innerText;
            btn.innerText = 'Saved!';
            setTimeout(() => btn.innerText = originalText, 2000);
        };
    }

    // 5. Weekly Progress Logic
    window.updateWeeklyProgress = () => {
        const progressText = document.getElementById('weekly-progress-text');
        const progressBar = document.getElementById('weekly-progress-bar');
        const trackerStatus = document.getElementById('tracker-status');
        
        if (!progressText || !progressBar) return;

        const taskData = typeof todos !== 'undefined' ? todos : [];
        const stats = typeof getStudyStats === 'function' ? getStudyStats() : { todayHours: 0 };

        const tasksDone = taskData.filter(t => t.completed).length;
        const totalTasks = taskData.length || 1;
        const taskWeight = (tasksDone / Math.max(totalTasks, 1)) * 50; 
        const hourWeight = Math.min((stats.todayHours / 8) * 50, 50); 
        
        const totalProgress = Math.round(taskWeight + hourWeight);
        progressText.innerText = totalProgress + '%';
        progressBar.style.width = totalProgress + '%';
        
        if (trackerStatus) {
            if (totalProgress >= 90) trackerStatus.innerText = 'Productivity King! 👑';
            else if (totalProgress >= 70) trackerStatus.innerText = 'Doing Great! 🔥';
            else if (totalProgress >= 40) trackerStatus.innerText = 'Keep it up! ✨';
            else trackerStatus.innerText = 'Start Today! 🚀';
        }
    };

    // Initial Renders
    renderDashTasks();
    renderStudyData();
    updateWeeklyProgress();
}
