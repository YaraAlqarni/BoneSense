// Fill example values
function fillExample() {
    document.getElementById('resistance').value = 522;
    document.getElementById('reactance').value = 48;
}

// Handle form submission
document.getElementById('measurementForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get values
    const resistance = parseFloat(document.getElementById('resistance').value);
    const reactance = parseFloat(document.getElementById('reactance').value);
    
    // Validate values
    if (resistance <= 0 || reactance <= 0) {
        alert('Please enter valid positive values');
        return;
    }
    
    // Calculate impedance
    const impedance = Math.sqrt(Math.pow(resistance, 2) + Math.pow(reactance, 2));
    
    // Save data to localStorage
    const data = {
        resistance: resistance,
        reactance: reactance,
        impedance: impedance,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('boneSenseData', JSON.stringify(data));
    
    // Navigate to results page
    window.location.href = 'results.html';
});

// Add visual effects when typing
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

/* ... 
قراءة القيم من المستخدم
حساب المعاوقة: Z = √(R² + Xc²)
حفظ البيانات في localStorage
الانتقال لصفحة النتائج """*/