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
    const wrappedText = text.split('').map(char => char === ' ' ? char : `<span>${char}</span>`).join('');
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
    let flickeringIndices = [];
    let flickerActive = true;

    function flickerLetter() {
        if (!flickerActive) return;

        // Ensure only two characters are flickering at a time
        while (flickeringIndices.length >= 2) {
            flickeringIndices.splice(0, 1); // Remove the first index
        }

        // Pick a random letter to flicker
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * allSpans.length);
        } while (flickeringIndices.includes(randomIndex) || allSpans[randomIndex].textContent === ' '); // Avoid spaces

        flickeringIndices.push(randomIndex);
        const currentFlicker = allSpans[randomIndex];
        currentFlicker.classList.add('flicker');

        // Set a random duration for the flicker effect (between 1 and 5 seconds)
        const flickerDuration = Math.random() * 4000 + 1000; // between 1000ms and 5000ms
        setTimeout(() => {
            currentFlicker.classList.remove('flicker');
            shootSparks(currentFlicker); // Call to shoot sparks when flicker ends
            flickeringIndices.splice(flickeringIndices.indexOf(randomIndex), 1); // Remove from flickering indices
            flickerLetter(); // Call flicker again
        }, flickerDuration);
    }

    // Function to shoot sparks from a flickering letter
    function shootSparks(element) {
        const sparksCount = 10; // Number of sparks to generate
        for (let i = 0; i < sparksCount; i++) {
            const spark = document.createElement('span');
            spark.classList.add('spark');
            spark.style.position = 'absolute';
            spark.style.left = `${element.getBoundingClientRect().left + Math.random() * element.offsetWidth}px`;
            spark.style.top = `${element.getBoundingClientRect().top + Math.random() * element.offsetHeight}px`;
            document.body.appendChild(spark);

            // Remove spark after animation duration
            setTimeout(() => {
                spark.remove();
            }, 500); // Duration of spark visibility
        }
    }

    // Start the first flicker
    flickerLetter();
}
