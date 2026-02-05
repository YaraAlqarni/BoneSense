window.addEventListener('DOMContentLoaded', function() {
    // Mock Data or LocalStorage
    const savedData = localStorage.getItem('boneSenseData');
    const measurementData = savedData ? JSON.parse(savedData) : {
        resistance: 522,
        reactance: 48,
        impedance: 524.2 // Default Z
    };

    displayResults(measurementData);
});

function displayResults(data) {
    // Display textual values
    document.getElementById('displayR').textContent = data.resistance.toFixed(1) + ' Ω';
    document.getElementById('displayXc').textContent = data.reactance.toFixed(1) + ' Ω';
    document.getElementById('displayZ').textContent = data.impedance.toFixed(2) + ' Ω';
    document.getElementById('impedanceDisplay').textContent = `Impedance: ${data.impedance.toFixed(2)} Ω`;

    // Logic based on Impedance (Z)
    let status = "";
    let color = "";
    let percent = 0; // For gauge mapping

    if (data.impedance > 540) {
        status = "NORMAL";
        color = "#4CAF50";
        percent = 0.8; 
    } else if (data.impedance > 510) {
        status = "OSTEOPENIA";
        color = "#FFC107";
        percent = 0.5;
    } else {
        status = "OSTEOPOROSIS";
        color = "#F44336";
        percent = 0.2;
    }

    document.getElementById('densityLevel').textContent = status;
    document.getElementById('densityLevel').style.color = color;
    document.getElementById('statusSummary').textContent = status;

    drawGauge(percent);
    updateProgressCircle(percent, color);
    drawTrendChart(data.impedance);
}

function drawGauge(percent) {
    const canvas = document.getElementById('densityGauge');
    const ctx = canvas.getContext('2d');
    canvas.width = 400; canvas.height = 220;
    
    const centerX = 200, centerY = 200, radius = 150;
    
    // Draw the blended background arc
    const grad = ctx.createLinearGradient(50, 0, 350, 0);
    grad.addColorStop(0, '#F44336'); // Red
    grad.addColorStop(0.5, '#FFEB3B'); // Yellow
    grad.addColorStop(1, '#4CAF50'); // Green
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 30;
    ctx.strokeStyle = grad;
    ctx.stroke();

    // Needle logic (Mapping percent 0-1 to PI to 2PI)
    const angle = Math.PI + (percent * Math.PI);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -5); ctx.lineTo(radius - 40, 0); ctx.lineTo(0, 5);
    ctx.fillStyle = '#333'; ctx.fill();
    ctx.restore();
}

function updateProgressCircle(percent, color) {
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 85;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (percent * circumference);
    circle.style.stroke = color;
}

function drawTrendChart(currentZ) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6mo ago', '4mo ago', '2mo ago', 'Now'],
            datasets: [{
                data: [currentZ - 15, currentZ - 8, currentZ - 2, currentZ],
                borderColor: '#00bcd4',
                backgroundColor: 'rgba(0, 188, 212, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: { 
                    ticks: { display: false }, // Hides the numbers
                    grid: { display: false } 
                },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });
}