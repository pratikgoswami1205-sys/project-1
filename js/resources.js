// Resource Filtering Logic
window.filterResources = function(category) {
    const cards = document.querySelectorAll('.modern-card');
    const tabs = document.querySelectorAll('.glass-tab');

    // Update active tab
    tabs.forEach(tab => {
        if (tab.innerText.toLowerCase().includes(category.toLowerCase()) || 
            (category === 'all' && (tab.innerText.includes('All')))) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.classList.add('animate-fade');
        } else {
            card.style.display = 'none';
        }
    });
};
