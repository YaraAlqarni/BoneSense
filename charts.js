// 1. Main Bone Density Gauge (Semi-Circle)
const ctxGauge = document.getElementById('boneDensityGauge').getContext('2d');
new Chart(ctxGauge, {
    type: 'doughnut',
    data: {
        labels: ['Normal', 'Osteopenia', 'Osteoporosis'],
        datasets: [{
            data: [50, 30, 20],
            backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
        }]
    },
    options: {
        aspectRatio: 1.8,
        cutout: '80%',
        plugins: { legend: { display: false } }
    }
});

// 2. Bone Density Trend (Line Chart)
const ctxTrend = document.getElementById('boneTrendChart').getContext('2d');
new Chart(ctxTrend, {
    type: 'line',
    data: {
        labels: ['-10 mo', '-6 mo', '-6 mo', '-2 mo', 'Now'],
        datasets: [{
            data: [-1.1, -0.9, -0.8, -0.4, -0.3],
            borderColor: '#00bcd4',
            backgroundColor: 'rgba(0, 188, 212, 0.1)',
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#00bcd4'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { min: -2.5, max: 0.5, grid: { color: '#f0f0f0' } },
            x: { grid: { display: false } }
        }
    }
});

// 3. Therapy Progress Circle (Right Sidebar)
const ctxTherapy = document.getElementById('therapyProgress').getContext('2d');
new Chart(ctxTherapy, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [70, 30],
            backgroundColor: ['#00bcd4', '#e0e0e0'],
            borderWidth: 0
        }]
    },
    options: { cutout: '92%', plugins: { legend: { display: false } } }
});