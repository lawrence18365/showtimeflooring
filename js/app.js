// Initialize Animate On Scroll
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        offset: 100,
        easing: 'ease-out-cubic',
        once: true
    });

    console.log('Showtime Event Flooring Loaded');
});

// Sticky Header & Hide on Scroll
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
        // Top of page
        header.classList.remove('scrolled-up');
        header.classList.remove('scrolled-down');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
        // Scrolling Down
        header.classList.remove('scrolled-up');
        header.classList.add('scrolled-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
        // Scrolling Up
        header.classList.remove('scrolled-down');
        header.classList.add('scrolled-up');
    }

    lastScroll = currentScroll;
});

/* Mobile toggle removed as nav links are gone */

// Mobile Navigation Toggle
const navToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');
const body = document.body;

if (navToggle) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        body.classList.toggle('mobile-nav-open');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            body.classList.remove('mobile-nav-open');
        });
    });
}
