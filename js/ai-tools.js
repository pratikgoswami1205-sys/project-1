// AI Tools Simulation Logic

window.aiSummarize = function() {
    const input = document.getElementById('summarizer-input').value;
    const resultDiv = document.getElementById('summarizer-result');
    const resultText = document.getElementById('summary-text');

    if (!input.trim()) return;

    // Simulate AI loading
    resultText.innerText = "Processing with AI...";
    resultDiv.style.display = 'block';

    setTimeout(() => {
        const sentences = input.split(/[.!?]/).filter(s => s.trim().length > 10);
        if (sentences.length > 2) {
            resultText.innerText = sentences[0] + ". " + sentences[Math.floor(sentences.length / 2)] + ".";
        } else {
            resultText.innerText = "The content is already quite concise. Key point: " + input.substring(0, 100) + "...";
        }
    }, 1500);
};

window.aiEssayIdeas = function() {
    const topic = document.getElementById('essay-topic').value;
    const resultDiv = document.getElementById('essay-result');
    const resultList = document.getElementById('essay-list');

    if (!topic.trim()) return;

    resultList.innerHTML = "<li>Thinking...</li>";
    resultDiv.style.display = 'block';

    setTimeout(() => {
        const ideas = [
            `The historical impact of ${topic} on modern society`,
            `Debating the ethical implications of ${topic}`,
            `A comparative analysis of ${topic} across different cultures`,
            `The future of ${topic}: Opportunities and challenges`,
            `Personal reflections on the role of ${topic} in education`
        ];
        resultList.innerHTML = ideas.map(i => `<li>${i}</li>`).join('');
    }, 1200);
};

window.aiGenerateQuestions = function() {
    const input = document.getElementById('questions-input').value;
    const resultDiv = document.getElementById('questions-result');
    const resultList = document.getElementById('questions-list');

    if (!input.trim()) return;

    resultList.innerHTML = "Analysing notes...";
    resultDiv.style.display = 'block';

    setTimeout(() => {
        const concepts = input.split(' ').filter(word => word.length > 6).slice(0, 4);
        const questions = concepts.length > 0
            ? concepts.map(c => `<p>• Explain the significance of <strong>${c}</strong> in this context?</p>`)
            : ["<p>• What are the core themes discussed in these notes?</p>", "<p>• How does this information connect to previous lessons?</p>"];
        
        resultList.innerHTML = questions.join('');
    }, 1800);
};

window.aiGenerateCaptions = function() {
    const context = document.getElementById('caption-context').value;
    const resultDiv = document.getElementById('caption-result');
    const resultList = document.getElementById('caption-list');

    if (!context.trim()) return;

    resultList.innerHTML = "Generating vibes...";
    resultDiv.style.display = 'block';

    setTimeout(() => {
        const captions = [
            `Grinding on ${context} today! 🚀 #StudyHard #HelperHub`,
            `Mastering ${context} one step at a time. ✨ #TechInEducation`,
            `Who knew ${context} could be this interesting? 📚 #StudentLife`,
            `Late night ${context} sessions. 🌙 #Productivity`,
            `Feeling like a pro in ${context}! 🎓 #AIStudy`
        ];
        resultList.innerHTML = captions.map(c => `<p style="margin-bottom: 0.8rem;">${c}</p>`).join('');
    }, 1000);
};
