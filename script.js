// Hamburger menu and theme switcher logic

document.addEventListener('DOMContentLoaded', function () {
    // Lucide icons init
    lucide.createIcons();

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeSwitch = document.querySelector('.theme-switch');
    let menuOpen = false;

    // Hamburger menu toggle
    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuOpen = navLinks.classList.contains('active');
        navToggle.innerHTML = menuOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });

    // Close menu when clicking a nav link (mobile UX)
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 640 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });

    // Theme switcher
    function setTheme(isDark) {
        document.body.classList.toggle('dark-theme', isDark);
        themeSwitch.innerHTML = isDark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';
        themeSwitch.classList.toggle('active', isDark);
        lucide.createIcons();
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    themeSwitch.addEventListener('click', function () {
        setTheme(!document.body.classList.contains('dark-theme'));
    });

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark');

    // Section entrance animation when scrolling in
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        },
        { threshold: 0.1 }
    );
    fadeEls.forEach((el) => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Contact form "fake" submit
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            contactForm.reset();
            const btn = contactForm.querySelector('.form-btn');
            btn.innerHTML = '<i data-lucide="check"></i> Sent!';
            btn.disabled = true;
            lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="send"></i> Send Message';
                btn.disabled = false;
                lucide.createIcons();
            }, 1800);
        });
    }
});