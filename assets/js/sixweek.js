// Course data - Only Six-week courses
const allCourses = [
    // Six-week Courses
    {
        id: 5,
        title: "Professional Child and Baby Care",
        instructor: "Lisa Thompson",
        price: 750,
        originalPrice: 1250,
        category: "Child Minding",
        duration: "Six-week",
        rating: 4.8,
        students: 650,
        description: "To provide basic child and baby care",
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
        rating: 4.7,
        students: 750,
        description: "To prepare and cook nutritious family meals",
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
        rating: 4.5,
        students: 550,
        description: "To provide basic knowledge of watering, pruning and planting in a domestic garden",
        image: "src/Garden-Maintenance.jpg"
    }
];

let filteredCourses = [...allCourses];
let filtersOpen = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderCourses();
    setupFilters();
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
    const stars = '★'.repeat(Math.floor(course.rating)) + (course.rating % 1 ? '☆' : '');
    const courseUrl = getCoursePageUrl(course);
    
    return `
        <div class="course-card" data-category="${course.category}" data-duration="${course.duration}" data-price="${course.price}" data-rating="${course.rating}" onclick="window.location.href='${courseUrl}'" style="cursor: pointer;">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="course-badge">${course.category}</div>
                <div class="course-badge" style="top: 10px; right: 10px; left: auto; background: #ff6b35;">${course.duration}</div>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">👤 ${course.instructor}</p>
                <div class="course-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">(${course.students})</span>
                </div>
                <div class="course-price">
                    <span class="current-price">R${course.price}</span>
                    <span class="original-price">R${course.originalPrice}</span>
                </div>
                <div class="course-actions">
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${course.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Render courses
function renderCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = filteredCourses.map(course => generateCourseCard(course)).join('');
    
    // Update results count
    document.getElementById('results-count').textContent = 
        `Showing all ${filteredCourses.length} six-week courses`;
}

// Setup filters
function setupFilters() {
    // All checkbox filters (categories only)
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Filter changed: ${this.id} = ${this.checked}`); // Debug log
            applyFilters();
        });
    });

    // Price filters
    document.getElementById('min-price').addEventListener('input', applyFilters);
    document.getElementById('max-price').addEventListener('input', applyFilters);
    document.getElementById('price-slider').addEventListener('input', function() {
        document.getElementById('max-price').value = this.value;
        applyFilters();
    });
}

// Apply filters
function applyFilters() {
    // Get checked category filters
    const categoryCheckboxes = document.querySelectorAll('input[id="child-minding"], input[id="cooking"], input[id="garden-maintenance"]');
    const categoryFilters = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || 5000;

    // Debug logging
    console.log('Category filters:', categoryFilters);
    console.log('Price range:', minPrice, '-', maxPrice);

    filteredCourses = allCourses.filter(course => {
        const categoryMatch = categoryFilters.length === 0 || categoryFilters.includes(course.category);
        const priceMatch = course.price >= minPrice && course.price <= maxPrice;
        
        return categoryMatch && priceMatch;
    });

    console.log('Filtered courses count:', filteredCourses.length);
    renderCourses();
}

// Clear all filters
function clearAllFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('price-slider').value = 2500;
    document.getElementById('sort-select').value = 'default';
    
    filteredCourses = [...allCourses];
    renderCourses();
}

// Sort courses
function sortCourses() {
    const sortBy = document.getElementById('sort-select').value;
    
    switch(sortBy) {
        case 'price-low':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCourses.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            filteredCourses = [...allCourses].filter(course => 
                filteredCourses.some(fc => fc.id === course.id)
            );
    }
    
    renderCourses();
}

// Toggle filters
function toggleFilters() {
    const filterContent = document.getElementById('filter-content');
    const filterArrow = document.getElementById('filter-arrow');
    
    filtersOpen = !filtersOpen;
    
    if (filtersOpen) {
        filterContent.classList.add('active');
        filterArrow.textContent = '▲';
    } else {
        filterContent.classList.remove('active');
        filterArrow.textContent = '▼';
    }
}

// Add to cart
function addToCart(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    alert(`Added "${course.title}" to cart!`);
}
