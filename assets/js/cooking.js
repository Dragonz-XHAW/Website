function toggleChapter(element) {
    const chapterList = element.nextElementSibling;
    const arrow = element.querySelector('span');
    
    if (chapterList.style.display === 'none') {
        chapterList.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        chapterList.style.display = 'none';
        arrow.textContent = '▼';
    }
}

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