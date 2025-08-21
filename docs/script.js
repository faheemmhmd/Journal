// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project carousel scroll buttons
const projectCarousel = document.querySelector('.project-carousel');
let isDown = false;
let startX;
let scrollLeft;

projectCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    projectCarousel.classList.add('active');
    startX = e.pageX - projectCarousel.offsetLeft;
    scrollLeft = projectCarousel.scrollLeft;
});

projectCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    projectCarousel.classList.remove('active');
});

projectCarousel.addEventListener('mouseup', () => {
    isDown = false;
    projectCarousel.classList.remove('active');
});

projectCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    projectCarousel.scrollLeft = scrollLeft - walk;
});

// Animate elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections except the hero section
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});
