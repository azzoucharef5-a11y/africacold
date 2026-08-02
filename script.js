// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
}

menuBtn.addEventListener('click', toggleMenu);

// Tool A: Cable Capacity Calculator
function calculateCable() {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const current = parseFloat(document.getElementById('current').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const material = document.getElementById('material').value;
    
    if (!current || !distance) {
        alert("Please enter both current and distance values.");
        return;
    }

    // Simplified calculation for demonstration
    // Resistivity (ohm * mm2 / m)
    const rho = material === 'copper' ? 0.0175 : 0.028;
    const allowableVoltageDrop = voltage * 0.03; // 3% drop
    
    // Size = (2 * rho * L * I) / Vdrop
    let size = (2 * rho * distance * current) / allowableVoltageDrop;
    
    // Standard cable sizes (mm2)
    const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300];
    let recommended = standardSizes.find(s => s >= size) || "Custom Consultation Required";

    const output = document.getElementById('cableOutput');
    const resultDiv = document.getElementById('cableResult');
    const quoteBtn = document.getElementById('cableQuote');

    output.innerText = typeof recommended === 'number' ? recommended + " mm²" : recommended;
    resultDiv.classList.remove('hidden');
    quoteBtn.classList.remove('hidden');
}

// Tool B: Cooling Load Estimator
function calculateCooling() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const usage = parseFloat(document.getElementById('usage').value);

    if (!length || !width || !height) {
        alert("Please enter all dimensions.");
        return;
    }

    // Rough calculation: Area * 100 * usage factor
    // Plus volume factor
    const area = length * width;
    const volume = area * height;
    
    // Base calculation in BTUs
    // Standard: 20 BTU per cubic foot or approx 700 BTU per cubic meter
    let btu = volume * 141 * usage; // Adjusted for cubic meters
    
    // Convert to kW (1 kW ≈ 3412 BTU/hr)
    const kw = (btu / 3412).toFixed(2);

    const output = document.getElementById('coolingOutput');
    const resultDiv = document.getElementById('coolingResult');
    const quoteBtn = document.getElementById('coolingQuote');

    output.innerText = `${Math.round(btu).toLocaleString()} BTU/hr (${kw} kW)`;
    resultDiv.classList.remove('hidden');
    quoteBtn.classList.remove('hidden');
}

// Form Submission (Mock)
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! Our team will contact you shortly.');
    e.target.reset();
});

// Smooth Scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
