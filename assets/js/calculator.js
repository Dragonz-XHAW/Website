// Course data
const courses = {
    'first-aid': { name: 'First Aid Awareness and Basic Life Support', price: 1500, duration: '6 months' },
    'sewing': { name: 'Professional Alterations and Garment Tailoring', price: 1500, duration: '6 months' },
    'landscaping': { name: 'Comprehensive Landscaping for Gardens', price: 1500, duration: '6 months' },
    'life-skills': { name: 'Essential Life Skills and Navigation', price: 1500, duration: '6 months' },
    'child-minding': { name: 'Professional Child and Baby Care', price: 750, duration: '6 weeks' },
    'cooking': { name: 'Nutritious Family Meal Preparation', price: 750, duration: '6 weeks' },
    'garden-maintenance': { name: 'Domestic Garden Care and Maintenance', price: 750, duration: '6 weeks' }
};

let selectedCourses = [];

// Toggle course selection
function toggleCourse(courseItem, courseId, price) {
    const checkbox = courseItem.querySelector('input[type="checkbox"]');
    const isCurrentlyChecked = checkbox.checked;
    
    // Toggle checkbox state
    checkbox.checked = !isCurrentlyChecked;
    
    // Update visual state
    if (checkbox.checked) {
        courseItem.classList.add('selected');
        if (!selectedCourses.find(c => c.id === courseId)) {
            selectedCourses.push({
                id: courseId,
                name: courses[courseId].name,
                price: price,
                duration: courses[courseId].duration
            });
        }
    } else {
        courseItem.classList.remove('selected');
        selectedCourses = selectedCourses.filter(c => c.id !== courseId);
    }

    // Update calculate button state
    updateCalculateButton();
}

// Update calculate button state
function updateCalculateButton() {
    const calculateBtn = document.getElementById('calculateBtn');
    if (selectedCourses.length > 0) {
        calculateBtn.disabled = false;
        calculateBtn.textContent = `Calculate Total Fee (${selectedCourses.length} course${selectedCourses.length > 1 ? 's' : ''})`;
    } else {
        calculateBtn.disabled = true;
        calculateBtn.textContent = 'Calculate Total Fee';
    }
}

// Validate form inputs
function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('customerName').value.trim();
    const nameInput = document.getElementById('customerName');
    const nameError = document.getElementById('nameError');
    
    if (name.length < 2) {
        nameInput.classList.add('error');
        nameError.style.display = 'block';
        nameError.textContent = 'Name must be at least 2 characters long';
        isValid = false;
    } else {
        nameInput.classList.remove('error');
        nameError.style.display = 'none';
    }

    // Validate phone
    const phone = document.getElementById('customerPhone').value.trim();
    const phoneInput = document.getElementById('customerPhone');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!phoneRegex.test(phone)) {
        phoneInput.classList.add('error');
        phoneError.style.display = 'block';
        phoneError.textContent = 'Phone number must be exactly 10 digits';
        isValid = false;
    } else {
        phoneInput.classList.remove('error');
        phoneError.style.display = 'none';
    }

    // Validate email
    const email = document.getElementById('customerEmail').value.trim();
    const emailInput = document.getElementById('customerEmail');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        emailInput.classList.remove('error');
        emailError.style.display = 'none';
    }

    return isValid;
}

// Calculate total fee with discounts and VAT
function calculateTotal() {
    // Validate form first
    if (!validateForm()) {
        alert('Please correct the errors in the contact form before calculating.');
        return;
    }

    // Check if courses are selected
    if (selectedCourses.length === 0) {
        alert('Please select at least one course.');
        return;
    }

    // Calculate subtotal
    const subtotal = selectedCourses.reduce((sum, course) => sum + course.price, 0);
    
    // Calculate discount
    let discountPercentage = 0;
    if (selectedCourses.length === 2) discountPercentage = 5;
    else if (selectedCourses.length === 3) discountPercentage = 10;
    else if (selectedCourses.length >= 4) discountPercentage = 15;
    
    const discountAmount = (subtotal * discountPercentage) / 100;
    const afterDiscount = subtotal - discountAmount;
    
    // Calculate VAT (15% on discounted amount)
    const vatAmount = (afterDiscount * 15) / 100;
    const grandTotal = afterDiscount + vatAmount;

    // Display results
    displayResults(subtotal, discountPercentage, discountAmount, afterDiscount, vatAmount, grandTotal);
}

// Display calculation results
function displayResults(subtotal, discountPercentage, discountAmount, afterDiscount, vatAmount, grandTotal) {
    const resultsSection = document.getElementById('resultsSection');
    const quotationSummary = document.getElementById('quotationSummary');
    const coursesBreakdown = document.getElementById('coursesBreakdown');

    // Build quotation summary
    let summaryHTML = `
        <div class="summary-row">
            <span class="summary-label">Total Fee (Before Discount):</span>
            <span class="summary-value">R${subtotal.toFixed(2)}</span>
        </div>
    `;

    if (discountPercentage > 0) {
        summaryHTML += `
            <div class="summary-row">
                <span class="summary-label">Discount (${discountPercentage}% for ${selectedCourses.length} courses):</span>
                <span class="summary-value discount-highlight">-R${discountAmount.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">After Discount:</span>
                <span class="summary-value">R${afterDiscount.toFixed(2)}</span>
            </div>
        `;
    }

    summaryHTML += `
        <div class="summary-row">
            <span class="summary-label">VAT (15%):</span>
            <span class="summary-value">R${vatAmount.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Grand Total:</span>
            <span class="summary-value">R${grandTotal.toFixed(2)}</span>
        </div>
    `;

    quotationSummary.innerHTML = summaryHTML;

    // Build courses breakdown
    let breakdownHTML = '';
    selectedCourses.forEach(course => {
        breakdownHTML += `
            <div class="breakdown-item">
                <div class="breakdown-course">
                    <strong>${course.name}</strong><br>
                    <small>${course.duration}</small>
                </div>
                <div class="breakdown-price">R${course.price.toFixed(2)}</div>
            </div>
        `;
    });

    coursesBreakdown.innerHTML = breakdownHTML;

    // Show results section
    resultsSection.classList.add('show');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCalculateButton();
    
    // Add real-time validation
    document.getElementById('customerName').addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateForm();
        }
    });
    
    document.getElementById('customerPhone').addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateForm();
        }
    });
    
    document.getElementById('customerEmail').addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateForm();
        }
    });
});