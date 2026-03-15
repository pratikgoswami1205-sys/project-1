let progressChart;
let weeklyHours = [2, 3.5, 0, 4, 1.5, 0, 0]; // Mock initial data for Mon-Sun
const targetWeeklyHours = 20;

document.addEventListener('DOMContentLoaded', () => {
    initChart();
    updateDashboard();
});

function initChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Gradient for chart fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)'); // var(--primary)
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    // Common styling
    Chart.defaults.color = '#94a3b8'; // text-muted
    Chart.defaults.font.family = "'Outfit', sans-serif";

    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: weeklyHours,
                borderColor: '#6366f1', // var(--primary)
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#a855f7', // var(--secondary)
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#a855f7',
                pointRadius: 5,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4 // Smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14, family: "'Outfit', sans-serif" },
                    bodyFont: { size: 14, family: "'Outfit', sans-serif" },
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' hrs';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    suggestedMax: 8
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function logHours() {
    const input = document.getElementById('study-hours-input');
    const hours = parseFloat(input.value);
    
    if (isNaN(hours) || hours <= 0) {
        alert("Please enter a valid number of hours.");
        return;
    }

    // In a real app we'd map this to current day, mockup just adds to a "today" slot or shifts data.
    // Let's assume today is Sunday (index 6) for demonstration
    weeklyHours[6] += hours;
    
    // Update Chart
    progressChart.update();
    
    // Update Dashboard
    updateDashboard();

    // Show Motivational Message
    const motMsg = document.getElementById('motivational-message');
    const messages = [
        "Great job! Keep learning.",
        "You're making excellent progress!",
        "Every hour counts. Stay focused!",
        "Awesome work today. Rest well!",
        "Unstoppable! Tomorrow will be even better."
    ];
    motMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
    motMsg.style.display = 'block';
    
    // Animate pop-in
    motMsg.style.animation = 'none';
    motMsg.offsetHeight; /* trigger reflow */
    motMsg.style.animation = 'fadeInUp 0.5s ease-out forwards';

    // Clear input
    input.value = '';
}

function updateDashboard() {
    const totalSelectedWeek = weeklyHours.reduce((a, b) => a + b, 0);
    const progressText = document.getElementById('weekly-progress-text');
    const progressBar = document.getElementById('weekly-progress-bar');
    
    progressText.textContent = `${totalSelectedWeek.toFixed(1)} / ${targetWeeklyHours} hrs`;
    
    let percent = (totalSelectedWeek / targetWeeklyHours) * 100;
    if (percent > 100) percent = 100;
    
    // Small delay for animation effect if calling on load
    setTimeout(() => {
        progressBar.style.width = percent + '%';
    }, 100);
}
