let measurementData = null;

window.addEventListener('DOMContentLoaded', function() {
    const savedData = localStorage.getItem('boneSenseData');
    // Default to Healthy values if no data is found to test the Green status
    measurementData = savedData ? JSON.parse(savedData) : { resistance: 550, reactance: 55, impedance: 552.7 };
    displayResults();
});

function classifyBoneDensity(z) {
    if (z >= 540) return { category: 'NORMAL', level: 'Healthy', color: '#4CAF50', score: 100 };
    if (z >= 500) return { category: 'OSTEOPENIA', level: 'Moderate Risk', color: '#FF9800', score: 50 };
    return { category: 'OSTEOPOROSIS', level: 'High Risk', color: '#F44336', score: 20 };
}

function displayResults() {
    const z = measurementData.impedance;
    const classification = classifyBoneDensity(z);

    // Update Text Elements
    document.getElementById('displayR').textContent = measurementData.resistance.toFixed(1) + ' Ω';
    document.getElementById('displayXc').textContent = measurementData.reactance.toFixed(1) + ' Ω';
    document.getElementById('displayZ').textContent = z.toFixed(2) + ' Ω';
    document.getElementById('impedanceDisplay').textContent = 'Impedance: ' + z.toFixed(2) + ' Ω';
    
    const densityLevel = document.getElementById('densityLevel');
    densityLevel.textContent = classification.category + ' BONE DENSITY';
    densityLevel.style.color = classification.color;
    
    const statusSummary = document.getElementById('statusSummary');
    statusSummary.textContent = classification.level;
    statusSummary.style.color = classification.color;

    // Update Progress Circle
    const circle = document.getElementById('progressCircle');
    const circumference = 534; 
    circle.style.strokeDashoffset = circumference - (classification.score / 100) * circumference;

    drawGauge(z, classification.color);
    drawTrendChart(z);
}

function drawGauge(z, color) {
    const canvas = document.getElementById('densityGauge');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 200, centerY = 200, radius = 150;

    // Draw Background Gradient Arc
    const grad = ctx.createLinearGradient(50, 200, 350, 200);
    grad.addColorStop(0, '#F44336');   // Red (Low Z)
    grad.addColorStop(0.5, '#FFEB3B'); // Yellow
    grad.addColorStop(1, '#4CAF50');   // Green (High Z)

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 40;
    ctx.strokeStyle = grad;
    ctx.stroke();

    // Map Z (450-600) to Angle (180deg to 360deg)
    const angle = Math.PI + (Math.min(Math.max(z, 450), 600) - 450) / 150 * Math.PI;

    // Draw Needle
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius - 20, 0);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#333';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.restore();
}

function drawTrendChart(z) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['-6mo', '-4mo', '-2mo', 'Now'],
            datasets: [{
                data: [z - 30, z - 15, z - 5, z],
                borderColor: '#00BCD4',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(0, 188, 212, 0.1)'
            }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 400, max: 650 } } }
    });
}
/*الوظائف:

تصنيف كثافة العظام (Normal/Osteopenia/Osteoporosis)
رسم المقياس الدائري باستخدام Canvas
رسم دائرة التقدم (Progress Circle)
رسم خط الاتجاه باستخدام Chart.js*/