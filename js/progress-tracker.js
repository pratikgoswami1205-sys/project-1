// Persistent Study Stats
let stats = JSON.parse(localStorage.getItem('hub-study-stats')) || {
    todayHours: 0,
    weeklyHours: [0, 0, 0, 0, 0, 0, 0],
    lastUpdate: new Date().toDateString()
};

let progressChart;
const targetWeeklyHours = 20;

document.addEventListener('DOMContentLoaded', () => {
    checkDayReset();
    initChart();
});

function checkDayReset() {
    const today = new Date().toDateString();
    if (stats.lastUpdate !== today) {
        stats.todayHours = 0;
        stats.lastUpdate = today;
        saveStats();
    }
}

function saveStats() {
    localStorage.setItem('hub-study-stats', JSON.stringify(stats));
    if (progressChart) {
        progressChart.data.datasets[0].data = stats.weeklyHours;
        progressChart.update();
    }
    updateUI();
}

function initChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    const context = ctx.getContext('2d');
    
    const gradient = context.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    Chart.defaults.color = 'rgba(148, 163, 184, 0.8)';
    Chart.defaults.font.family = "'Outfit', sans-serif";

    progressChart = new Chart(context, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: stats.weeklyHours,
                borderColor: '#6366f1',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#a855f7',
                pointRadius: 4,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, suggestedMax: 8, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
    updateUI();
}

window.logHours = function() {
    const input = document.getElementById('study-hours-input');
    const value = parseFloat(input.value);
    
    if (isNaN(value) || value <= 0) {
        alert("Enter valid hours!");
        return;
    }

    const today = new Date();
    const dayIndex = (today.getDay() + 6) % 7; // Mon-Sun
    
    stats.todayHours += value;
    stats.weeklyHours[dayIndex] += value;
    stats.lastUpdate = today.toDateString();
    
    saveStats();
    showMotivation();
    input.value = '';
};

function updateUI() {
    const totalWeekly = stats.weeklyHours.reduce((a, b) => a + b, 0);
    const progressText = document.getElementById('weekly-progress-text');
    const progressBar = document.getElementById('weekly-progress-bar');
    
    if (progressText) progressText.textContent = `${totalWeekly.toFixed(1)} / ${targetWeeklyHours} hrs`;
    if (progressBar) {
        let percent = Math.min((totalWeekly / targetWeeklyHours) * 100, 100);
        progressBar.style.width = percent + '%';
    }
}

function showMotivation() {
    const motMsg = document.getElementById('motivational-message');
    if (!motMsg) return;
    const messages = ["Great progress!", "Keep it up!", "Focus wins!", "Excellent session!"];
    motMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
    motMsg.style.display = 'block';
    motMsg.style.animation = 'fadeInUp 0.5s ease-out forwards';
}
