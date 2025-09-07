// Navbar mobile toggle
const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');
menuBtn.addEventListener('click', () => navlinks.classList.toggle('open'));

// Theme toggle (persist)
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.documentElement.classList.add('light');
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
});

// Year set
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll using IntersectionObserver
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('revealed');
            // Animate skill bars when section visible
            if (e.target.classList.contains('skill')) {
                const bar = e.target.querySelector('.bar');
                const level = bar.getAttribute('data-level');
                bar.style.transition = 'transform .9s cubic-bezier(.2,.8,.2,1)';
                bar.style.transform = `scaleX(${level / 100})`;
            }
            io.unobserve(e.target);
        }
    })
}, { threshold: .18 });

document.querySelectorAll('.reveal, .skill').forEach(el => io.observe(el));

// Contact form (demo only)
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    alert(`Thanks, ${name}! Your message has been sent.`);
    e.target.reset();
});

// Hover interaction for skill bars
document.querySelectorAll('.skill').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        card.style.transform = 'translateY(-3px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});