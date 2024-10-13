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

    // Start regular particles only if it's NOT the birthday
    if (!isBirthday()) {
        createRegularParticles(); // Create regular particles only when it's not a birthday
    }
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
        constructor() {
            // Store relative position instead of absolute position
            this.relativeX = Math.random();
            this.relativeY = Math.random();
            this.x = this.relativeX * canvas.width;
            this.y = this.relativeY * canvas.height;
            this.size = Math.random() * 2 + 1; // Increase size for better visibility
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Update relative position
            this.relativeX = this.x / canvas.width;
            this.relativeY = this.y / canvas.height;

            // Reset particle position if it goes off-screen
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, 1)`; // White color with full alpha for glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < particleCount; i++) {
            const particle = new Particle();
            particlesArray.push(particle);
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
        particlesArray.forEach(p => {
            p.x = p.relativeX * canvas.width;
            p.y = p.relativeY * canvas.height;
        });
    });
}