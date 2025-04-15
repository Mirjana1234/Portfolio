// Mörkt läge toggle
const checkbox = document.getElementById('checkbox');
const themeText = document.querySelector('.theme-mode');

// Kolla om användaren tidigare valt mörkt läge
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    checkbox.checked = true;
    themeText.textContent = 'Ljust läge';
}

// Lyssnare för toggle
checkbox.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeText.textContent = 'Ljust läge';
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeText.textContent = 'Mörkt läge';
    }
});

// Hamburger-meny
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Togglea navigation
    navLinks.classList.toggle('active');
    
    // Animera hamburger-ikon
    hamburger.classList.toggle('toggle');
    
    // Förhindra scroll när menyn är öppen
    document.body.classList.toggle('no-scroll');
});

// Stäng menyn när en länk klickas
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
    });
});

// Stäng menyn när man klickar utanför
document.body.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
    }
});

// Hantera CV-nedladdning
const downloadButton = document.querySelector('.download-button');
if (downloadButton) {
    downloadButton.addEventListener('click', function(e) {
        // Kontrollera om CV-filen finns
        fetch('cv.pdf')
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    alert('CV är för närvarande inte tillgänglig. Vänligen försök igen senare eller kontakta mig direkt.');
                }
            })
            .catch(() => {
                e.preventDefault();
                alert('CV är för närvarande inte tillgänglig. Vänligen försök igen senare eller kontakta mig direkt.');
            });
    });
}

// Smidig scroll till ankarlänkar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Justerad för header-höjd
            behavior: 'smooth'
        });
    });
});

// Enkel kontaktformulär-hantering
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Här kan du lägga till kod för att skicka formuläret senare
        // För nu, visa bara en alert
        alert('Tack för ditt meddelande! I en riktig implementation skulle detta skickas till en server.');
        
        // Återställ formuläret
        contactForm.reset();
    });
}

// Enkel animerad navigering - markera aktiv länk vid scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Lägg till en klass för att visa aktiv länk i menyn
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
