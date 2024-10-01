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
    const wrappedText = text.split('').map(char => {
        return char === ' ' ? '&nbsp;' : `<span>${char}</span>`; // Preserve spaces
    }).join('');
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
    const allSpans = document.querySelectorAll('header span, main span');
    let currentFlicker;
    let currentSparks = [];

    function flickerLetter() {
        // Clear the previous flickering letter
        if (currentFlicker) {
            currentFlicker.classList.remove('flicker');
            removeSparks();
        }

        // Pick a random letter to flicker
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        currentFlicker = allSpans[randomIndex];
        currentFlicker.classList.add('flicker');

        // Randomly create sparks
        createSparks(currentFlicker);

        // Set a random delay for the next flicker (between 1 to 5 seconds)
        const delay = Math.random() * 4000 + 1000; // 1 to 5 seconds
        setTimeout(flickerLetter, delay);
    }

    // Start the first flicker
    flickerLetter();

    function createSparks(letterElement) {
        const rect = letterElement.getBoundingClientRect();
        const sparkCount = Math.floor(Math.random() * 5) + 3; // Random sparks between 3 and 7

        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            document.body.appendChild(spark);

            // Position the spark
            const x = rect.left + rect.width / 2 + (Math.random() * 20 - 10); // Center of the letter
            const y = rect.top + rect.height;
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;

            // Remove the spark after animation ends
            setTimeout(() => {
                spark.remove();
            }, 1000); // Match the duration of the fall animation
        }
    }

    function removeSparks() {
        const sparks = document.querySelectorAll('.spark');
        sparks.forEach(spark => spark.remove());
    }
}

// Function to randomly create particles on the screen
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 5 + 2; // Random size
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `${window.innerHeight}px`; // Start from bottom

    document.body.appendChild(particle);

    // Remove particle after animation ends
    setTimeout(() => {
        particle.remove();
    }, 2000); // Match the duration of the particle animation
}

// Create particles at intervals
setInterval(createParticle, 500); // Adjust frequency of particles
