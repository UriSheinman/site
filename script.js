// Function to get the current year plus one
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1;
}

// Update year on page load
document.addEventListener('DOMContentLoaded', updateYear);

// Function to redirect to urisheinman.com when the header is clicked
function redirectToUriSheinman() {
    window.location.href = 'https://urisheinman.com';
}

// Attach event listeners to the elements
document.querySelector('header').addEventListener('click', redirectToUriSheinman);

// Function to wrap each character in a span, but exclude the footer
function wrapCharactersWithSpan(element) {
    const text = element.textContent;
    const wrappedText = text.split('').map(char => char === ' ' ? '&nbsp;' : `<span>${char}</span>`).join(''); // Preserve spaces
    element.innerHTML = wrappedText;
}

// Apply the wrapping to header and main content only (no footer)
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');

    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);

    // Start the random flickering effect
    startFlickeringEffect();

    // Start particle effects
    initParticles();
});

// Function to randomly flicker letters (excluding footer)
function startFlickeringEffect() {
    const allSpans = document.querySelectorAll('header span, main span');
    let flickeringIndexes = []; // Track flickering indexes

    function flickerLetter() {
        // Clear old flickers
        flickeringIndexes.forEach(index => {
            allSpans[index].classList.remove('flicker');
        });

        // Clear the tracking array
        flickeringIndexes = [];

        // Pick up to 2 random indexes that will flicker
        let randomIndex1 = Math.floor(Math.random() * allSpans.length);
        let randomIndex2;

        do {
            randomIndex2 = Math.floor(Math.random() * allSpans.length);
        } while (randomIndex2 === randomIndex1); // Ensure different random indexes

        // Add flickering classes to both random characters
        flickeringIndexes.push(randomIndex1);
        flickeringIndexes.push(randomIndex2);

        allSpans[randomIndex1].classList.add('flicker');
        allSpans[randomIndex2].classList.add('flicker');

        // Remove flicker after a random duration (1-5 seconds)
        const flickerDuration = Math.random() * 4000 + 1000;
        setTimeout(() => {
            allSpans[randomIndex1].classList.remove('flicker');
            allSpans[randomIndex2].classList.remove('flicker');
        }, flickerDuration);

        // Stagger the timing of the flickers to avoid synchronization
        const nextFlickerDelay = Math.random() * 800 + 300; // Flicker every 300ms to 1.1s
        setTimeout(flickerLetter, nextFlickerDelay);
    }

    // Start the first flicker
    flickerLetter();
}

// Function to initialize particle effects
function initParticles() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call to set canvas size

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.alpha = Math.random() * 0.5 + 0.3; // Glow with slight transparency
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap particles when they go off-screen
            if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
            if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white"; // Glowing effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticlesArray() {
        particlesArray = [];
        for (let i = 0; i < 150; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    initParticlesArray();
    animateParticles();
}
