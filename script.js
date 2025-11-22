// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pokemon-card, .analogy-card, .concept-box');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });

    // Add click effect to cards
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    pokemonCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'cardFlash 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Add sparkle effect on hover
    const analogyCards = document.querySelectorAll('.analogy-card');
    analogyCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createSparkle(e.clientX, e.clientY);
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
        
        if (konamiCode.join('').includes(konamiSequence.join(''))) {
            activatePikachuMode();
        }
    });
});

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #fff, #ff0);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnimation 0.6s ease-out;
        z-index: 9999;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes cardFlash {
        0%, 100% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.3);
        }
    }

    @keyframes pikachuJump {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        25% {
            transform: translateY(-20px) rotate(-5deg);
        }
        75% {
            transform: translateY(-20px) rotate(5deg);
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Pikachu mode
function activatePikachuMode() {
    const body = document.body;
    body.style.animation = 'pikachuJump 0.5s ease-in-out 3';
    
    // Create Pikachu message
    const message = document.createElement('div');
    message.textContent = '⚡ PIKACHU! You found the secret! ⚡';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #000;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: cardFlash 0.5s infinite;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
    
    // Change all card icons to Pikachu temporarily
    const icons = document.querySelectorAll('.card-icon');
    const originalIcons = [];
    icons.forEach(icon => {
        originalIcons.push(icon.textContent);
        icon.textContent = '⚡';
    });
    
    setTimeout(() => {
        icons.forEach((icon, index) => {
            icon.textContent = originalIcons[index];
        });
    }, 5000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Console message for developers
console.log('%c🎮 MCP Cheat Info 🎮', 'color: #EE1515; font-size: 24px; font-weight: bold;');
console.log('%cGotta Understand \'Em All!', 'color: #3B4CCA; font-size: 16px;');
console.log('%cTip: Try the Konami code! ↑↑↓↓←→←→BA', 'color: #FFDE00; font-size: 12px;');
