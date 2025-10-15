// Course data - Based on JSON structure
const courses = [
    // Six-month Courses
    {
        id: 1,
        title: "First Aid Awareness and Basic Life Support",
        instructor: "Dr. Sarah Mitchell",
        price: 1500,
        originalPrice: 2500,
        category: "First Aid",
        duration: "Six-month",
        image: "src/First-Aid.png"
    },
    {
        id: 2,
        title: "Professional Alterations and Garment Tailoring",
        instructor: "Maria Santos",
        price: 1500,
        originalPrice: 2500,
        category: "Sewing",
        duration: "Six-month",
        image: "src/Garment-Tailoring.jpg"
    },
    {
        id: 3,
        title: "Comprehensive Landscaping for Gardens",
        instructor: "David Green",
        price: 1500,
        originalPrice: 2500,
        category: "Landscaping",
        duration: "Six-month",
        image: "src/Landscaping.jpeg"
    },
    {
        id: 4,
        title: "Essential Life Skills and Navigation",
        instructor: "Jennifer Wilson",
        price: 1500,
        originalPrice: 2500,
        category: "Life Skills",
        duration: "Six-month",
        image: "src/Life-Skills.png"
    },
    
    // Six-week Courses
    {
        id: 5,
        title: "Professional Child and Baby Care",
        instructor: "Lisa Thompson",
        price: 750,
        originalPrice: 1250,
        category: "Child Minding",
        duration: "Six-week",
        image: "src/Baby-Care.jpg"
    },
    {
        id: 6,
        title: "Nutritious Family Meal Preparation",
        instructor: "Chef Michael Brown",
        price: 750,
        originalPrice: 1250,
        category: "Cooking",
        duration: "Six-week",
        image: "src/Cooking.avif"
    },
    {
        id: 7,
        title: "Domestic Garden Care and Maintenance",
        instructor: "Robert Johnson",
        price: 750,
        originalPrice: 1250,
        category: "Garden Maintenance",
        duration: "Six-week",
        image: "src/Garden-Maintenance.jpg"
    }
];

// Cart state
let cart = [];
let isCartOpen = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderTopCourses();
});

// Function to get course page URL based on course category/name
function getCoursePageUrl(course) {
    const courseNameMap = {
        'First Aid': 'first-aid.html',
        'Sewing': 'sewing.html',
        'Landscaping': 'landscaping.html',
        'Life Skills': 'life-skills.html',
        'Child Minding': 'child-minding.html',
        'Cooking': 'cooking.html',
        'Garden Maintenance': 'garden-maintenance.html'
    };
    return courseNameMap[course.category] || '#';
}

// Generate course card HTML
function generateCourseCard(course) {
    const isInCart = cart.some(c => c.id === course.id);
    const courseUrl = getCoursePageUrl(course);
    
    return `
        <div class="course-card" onclick="window.location.href='${courseUrl}'" style="cursor: pointer;">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px 10px 0 0;">
                <div class="course-badge">${course.category}</div>
                <div class="course-badge" style="top: 10px; right: 10px; left: auto; background: #ff6b35;">${course.duration}</div>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">👤 ${course.instructor}</p>
                <div class="course-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-text">(1.2K)</span>
                </div>
                <div class="course-price">
                    <span class="current-price">R${course.price}</span>
                    <span class="original-price">R${course.originalPrice}</span>
                </div>
                <div class="course-actions">
                    <button class="add-to-cart-btn ${isInCart ? 'added' : ''}" 
                            data-course-id="${course.id}" 
                            onclick="event.stopPropagation(); toggleCourse(${course.id})">
                        ${isInCart ? 'Remove' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render top 6 courses
function renderTopCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    // Show all 6 courses (since we only have 7 total, show first 6)
    const topCourses = courses.slice(0, 6);
    
    coursesGrid.innerHTML = topCourses.map(course => generateCourseCard(course)).join('');
}

// Toggle course in cart
function toggleCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    const btn = document.querySelector(`[data-course-id="${courseId}"]`);
    
    const existingIndex = cart.findIndex(c => c.id === courseId);
    
    if (existingIndex > -1) {
        // Remove from cart
        cart.splice(existingIndex, 1);
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
    } else {
        // Add to cart
        cart.push(course);
        btn.textContent = 'Remove';
        btn.classList.add('added');
    }
    
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const discountInfo = document.getElementById('discountInfo');
    const discountAmount = document.getElementById('discountAmount');

    // Update cart count
    if (cart.length > 0) {
        cartCount.textContent = cart.length;
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light); margin: 2rem 0;">No courses selected</p>';
    } else {
        cartItems.innerHTML = cart.map(course => `
            <div class="cart-item">
                <span class="cart-item-name">${course.title}</span>
                <span class="cart-item-price">R${course.price}</span>
            </div>
        `).join('');
    }

    // Calculate total and discount
    const subtotal = cart.reduce((sum, course) => sum + course.price, 0);
    let discount = 0;
    let finalTotal = subtotal;

    // Apply bulk discounts based on number of courses
    if (cart.length >= 2) {
        if (cart.length === 2) {
            discount = subtotal * 0.05; // 5% discount for 2 courses
        } else if (cart.length === 3) {
            discount = subtotal * 0.10; // 10% discount for 3 courses
        } else if (cart.length >= 4) {
            discount = subtotal * 0.15; // 15% discount for 4+ courses
        }
        finalTotal = subtotal - discount;
    }

    // Update display
    cartTotal.textContent = `R${Math.round(finalTotal)}`;

    // Show/hide discount info
    if (discount > 0) {
        discountInfo.style.display = 'block';
        discountAmount.textContent = `You save: R${Math.round(discount)}`;
    } else {
        discountInfo.style.display = 'none';
    }

    // Re-render top courses to update button states
    renderTopCourses();
}

// Toggle cart visibility
function toggleCart() {
    const cartCalculator = document.getElementById('cartCalculator');
    isCartOpen = !isCartOpen;
    
    if (isCartOpen) {
        cartCalculator.classList.add('active');
    } else {
        cartCalculator.classList.remove('active');
    }
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartCalculator = document.getElementById('cartCalculator');
    const cartToggle = document.querySelector('.cart-toggle');
    
    if (isCartOpen && 
        !cartCalculator.contains(event.target) && 
        !cartToggle.contains(event.target)) {
        toggleCart();
    }
});

// Burger menu toggle functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const burgerMenu = document.querySelector('.burger-menu');
    
    navMenu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const burgerMenu = document.querySelector('.burger-menu');
            
            navMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });
});