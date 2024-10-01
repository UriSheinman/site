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
    const wrappedText = text.split('').map(char => `<span>${char}</span>`).join('');
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

// Function to randomly flicker letters (max 2 at a time)
function startFlickeringEffect() {
    const allSpans = document.querySelectorAll('header span, main span');
    const flickerDuration = Math.random() * 4000 + 1000; // Random flicker duration between 1 to 5 seconds
    const maxFlickers = 2; // Maximum flickering characters

    function flickerLetters() {
        // Get currently flickering spans
        const currentlyFlickering = Array.from(allSpans).filter(span => span.classList.contains('flicker'));

        // Flicker up to the max allowed
        if (currentlyFlickering.length < maxFlickers) {
            // Pick a random letter to flicker that isn't already flickering
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * allSpans.length);
            } while (currentlyFlickering.includes(allSpans[randomIndex])); // Ensure it’s not already flickering
            
            // Flicker the chosen letter
            allSpans[randomIndex].classList.add('flicker');
            
            // Remove flicker class after a short time
            setTimeout(() => {
                allSpans[randomIndex].classList.remove('flicker');
            }, flickerDuration);
        }

        // Set a random delay for the next flicker
        const delay = Math.random() * 4000 + 1000; // Random delay between 1 to 5 seconds
        setTimeout(flickerLetters, delay);
    }

    // Start flickering
    flickerLetters();
}

// Start the flickering effect on load
document.addEventListener('DOMContentLoaded', startFlickeringEffect);
