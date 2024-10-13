// Update the year in the footer
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1; // Update year with next year
}

// Update year on page load
document.addEventListener('DOMContentLoaded', updateYear);

// Function to redirect to a URL when the header is clicked
function redirectToUriSheinman() {
    window.location.href = 'https://urisheinman.com';
}

// Attach event listeners
document.querySelector('header').addEventListener('click', redirectToUriSheinman);

// Function to wrap each character in a span
function wrapCharactersWithSpan(element) {
    const text = element.textContent;
    const wrappedText = text.split('').map(char => char === ' ' ? ' ' : `<span>${char}</span>`).join('');
    element.innerHTML = wrappedText;
}

// Apply wrapping to header and main content only
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');
    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);
    startFlickeringEffect();
});

// Flicker effect with maximum 2 characters at a time and random neighboring flicker
function startFlickeringEffect() {
    const allSpans = document.querySelectorAll('header span, main span');
    let activeFlickers = [];

    function flickerLetter() {
        if (activeFlickers.length >= 2) {
            const spanToReset = activeFlickers.shift();
            spanToReset.classList.remove('flicker');
        }

        let randomIndex = Math.floor(Math.random() * allSpans.length);
        let randomSpan = allSpans[randomIndex];

        if (!randomSpan.classList.contains('flicker')) {
            randomSpan.classList.add('flicker');
            activeFlickers.push(randomSpan);
        }

        // Random neighboring flicker logic
        if (Math.random() < 0.2) {  // 20% chance of neighboring flicker
            const neighborIndex = (randomIndex + 1) % allSpans.length;
            const neighborSpan = allSpans[neighborIndex];
            if (!neighborSpan.classList.contains('flicker')) {
                neighborSpan.classList.add('flicker');
                activeFlickers.push(neighborSpan);
            }
        }

        const delay = Math.random() * 3000 + 500;  // Random delay between 0.5 to 3.5 seconds
        setTimeout(flickerLetter, delay);
    }

    flickerLetter();
}

// Regular particle system
function createRegularParticles() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const particleCount = 100;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1; // Increase size for better visibility
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
            this.alpha = 1; // Full glow
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reset particle position if it goes off-screen
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // White color with full alpha for glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particlesArray.push(new Particle(x, y));
        }
    }

    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
    }

    function animateParticles() {
        handleParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Resize canvas when window is resized
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles(); // Re-initialize particles on resize
    });
}

// Create regular particles on page load
document.addEventListener('DOMContentLoaded', function () {