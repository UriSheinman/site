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

// Function to randomly flicker letters (excluding footer)
function startFlickeringEffect() {
    // Get all spans from header and main only
    const allSpans = document.querySelectorAll('header span, main span');
    let flickeringIndexes = []; // Keep track of flickering indexes

    function flickerLetter() {
        // Clear previous flickering letters
        flickeringIndexes.forEach(index => {
            allSpans[index].classList.remove('flicker');
        });

        // If two characters are already flickering, do nothing
        if (flickeringIndexes.length >= 2) {
            return setTimeout(flickerLetter, 500); // Retry after a short delay
        }

        // Randomly pick a new letter to flicker
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        const selectedSpan = allSpans[randomIndex];

        // Ensure we don't flicker the same letter more than once and avoid spaces
        if (!flickeringIndexes.includes(randomIndex) && selectedSpan.textContent.trim() !== '') {
            flickeringIndexes.push(randomIndex);
            selectedSpan.classList.add('flicker');

            // Handle neighboring flicker
            const neighborLeft = allSpans[randomIndex - 1];
            const neighborRight = allSpans[randomIndex + 1];

            // Random delay for neighboring flickers to create a staggered effect
            if (neighborLeft && neighborLeft.textContent.trim() !== '' && !flickeringIndexes.includes(randomIndex - 1)) {
                flickeringIndexes.push(randomIndex - 1);
                neighborLeft.classList.add('flicker');

                // Delay for neighbor
                setTimeout(() => {
                    flickeringIndexes = flickeringIndexes.filter(index => index !== (randomIndex - 1));
                    neighborLeft.classList.remove('flicker');
                }, Math.random() * 3000 + 1000); // Between 1 and 4 seconds
            }

            if (neighborRight && neighborRight.textContent.trim() !== '' && !flickeringIndexes.includes(randomIndex + 1)) {
                flickeringIndexes.push(randomIndex + 1);
                neighborRight.classList.add('flicker');

                // Delay for neighbor
                setTimeout(() => {
                    flickeringIndexes = flickeringIndexes.filter(index => index !== (randomIndex + 1));
                    neighborRight.classList.remove('flicker');
                }, Math.random() * 3000 + 1000); // Between 1 and 4 seconds
            }

            // Set a random delay for the next flicker (between 1 to 5 seconds)
            const delay = Math.random() * 4000 + 1000; // Between 1 and 5 seconds
            setTimeout(() => {
                flickeringIndexes = flickeringIndexes.filter(index => index !== randomIndex);
                selectedSpan.classList.remove('flicker');
                flickerLetter(); // Call again for the next flicker
            }, delay);
        } else {
            // Retry if the selected span is not valid
            flickerLetter();
        }
    }

    // Start the first flicker
    flickerLetter();
}

// Create background particles
function createParticles() {
    const particleCount = 3; // Number of particles to generate per interval

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);

        // Randomize size for variety
        const size = Math.random() * 5 + 5; // Size between 5px and 10px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Position the particle randomly within the viewport
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Randomize the direction of the particles
        const angle = Math.random() * 360; // Random angle
        const distance = Math.random() * 50 + 30; // Random distance
        const xOffset = distance * Math.cos(angle * (Math.PI / 180));
        const yOffset = distance * Math.sin(angle * (Math.PI / 180));

        // Apply the animation with randomized direction
        particle.style.transition = `transform 2s ease`;
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

        // Remove the particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, 2000); // Match the duration of the fall animation
    }
}

// Periodically create particles
setInterval(createParticles, 1000); // Create particles every second
