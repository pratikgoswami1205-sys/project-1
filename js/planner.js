let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addTask = function() {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    if (text) {
        tasks.push({ text, completed: false, id: Date.now() });
        input.value = '';
        save();
        render();
    }
};

window.toggleTask = function(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save();
    render();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
};

function save() { 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function render() {
    const list = document.getElementById('tasks-list');
    if (!list) return;

    if (tasks.length === 0) {
        list.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted); font-style: italic;">No milestones added yet. Start planning your success!</div>`;
        updateProgress(0);
        return;
    }

    list.innerHTML = '';
    tasks.forEach(t => {
        const item = document.createElement('div');
        item.className = 'glass';
        item.style.cssText = `padding: 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 1.2rem; transition: var(--transition); border-color: ${t.completed ? 'transparent' : 'var(--glass-border)'}; opacity: ${t.completed ? 0.6 : 1}; transform: ${t.completed ? 'scale(0.98)' : 'scale(1)'}`;
        
        item.innerHTML = `
            <div style="width: 26px; height: 26px; border-radius: 8px; border: 2px solid ${t.completed ? 'var(--primary)' : 'var(--text-muted)'}; cursor: pointer; display: flex; align-items: center; justify-content: center; background: ${t.completed ? 'var(--primary)' : 'transparent'}; transition: var(--transition);">
                ${t.completed ? '<i class="fas fa-check" style="color: white; font-size: 0.8rem;"></i>' : ''}
            </div>
            <span style="flex: 1; font-weight: 500; font-size: 1.05rem; text-decoration: ${t.completed ? 'line-through' : 'none'}; color: ${t.completed ? 'var(--text-muted)' : 'var(--text-main)'}; cursor: pointer;">${t.text}</span>
            <button style="background: rgba(255, 71, 87, 0.1); border: none; color: #ff4757; width: 38px; height: 38px; border-radius: 12px; cursor: pointer; transition: var(--transition);">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        item.querySelector('div').onclick = () => toggleTask(t.id);
        item.querySelector('span').onclick = () => toggleTask(t.id);
        item.querySelector('button').onclick = () => deleteTask(t.id);

        list.appendChild(item);
    });
    
    const completed = tasks.filter(t => t.completed).length;
    const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    updateProgress(percent);
}

function updateProgress(percent) {
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    if (fill) fill.style.width = percent + '%';
    if (text) text.innerText = percent + '%';
}

document.addEventListener('DOMContentLoaded', render);
