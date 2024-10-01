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
});

// Function to randomly flicker one letter at a time (excluding footer)
function startFlickeringEffect() {
    // Get all spans from header and main only
    const allSpans = document.querySelectorAll('header span, main span');
    let currentFlicker = [];

    function flickerLetter() {
        // Clear previous flickering letters
        currentFlicker.forEach(span => span.classList.remove('flicker'));

        // Randomly pick new letters to flicker (2 max)
        const flickerCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 flickering letters
        currentFlicker = [];

        while (currentFlicker.length < flickerCount) {
            const randomIndex = Math.floor(Math.random() * allSpans.length);
            const selectedSpan = allSpans[randomIndex];

            // Ensure we don't flicker the same letter more than once
            if (!currentFlicker.includes(selectedSpan) && selectedSpan.textContent.trim() !== '') {
                currentFlicker.push(selectedSpan);
                selectedSpan.classList.add('flicker');
            }
        }

        // Set a random delay for the next flicker (between 1 to 5 seconds)
        const delay = Math.random() * 4000 + 1000; // Between 1 and 5 seconds
        setTimeout(flickerLetter, delay);
    }

    // Start the first flicker
    flickerLetter();
}

// Create background particles
function createParticles() {
    const particleCount = 10; // Number of particles to generate

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);

        // Position the particle randomly within the viewport
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Remove the particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, 2000); // Match the duration of the fall animation
    }
}

// Periodically create particles
setInterval(createParticles, 3000); // Adjust interval as needed
