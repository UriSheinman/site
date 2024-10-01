// Function to get the current year plus one
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1;
}

// Update year on page load
document.addEventListener('DOMContentLoaded', function() {
    updateYear();
    
    // Attach event listeners to the header element
    document.querySelector('header').addEventListener('click', redirectToUriSheinman);

    // Wrap characters in spans for flickering effect
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');

    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);

    // Start the random flickering effect on page load
    startFlickeringEffect();
});

// Function to redirect to urisheinman.com when the header is clicked
function redirectToUriSheinman() {
    window.location.href = 'https://urisheinman.com';
}

// Function to wrap each character in a span, excluding spaces
function wrapCharactersWithSpan(element) {
    const text = element.textContent;
    const wrappedText = text.split('').map(char => {
        if (char === ' ') {
            return ' '; // Leave spaces as-is, no span wrapping
        }
        return `<span>${char}</span>`; // Wrap non-space characters in spans
    }).join('');
    element.innerHTML = wrappedText;
}

// Function to randomly flicker letters with random duration and neighboring letters in parallel
function startFlickeringEffect() {
    // Get all spans from header and main only (excluding spaces)
    const allSpans = document.querySelectorAll('header span, main span');
    
    function flickerLetter() {
        // Pick a random letter to flicker
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        const currentFlicker = allSpans[randomIndex];
        
        // Randomly set a flicker duration between 1 and 5 seconds
        const flickerDuration = Math.random() * 4000 + 1000; // Between 1s and 5s
        
        currentFlicker.style.animationDuration = '0.2s'; // Keep fast flicker speed
        currentFlicker.classList.add('flicker');

        // Remove flicker after random duration
        setTimeout(() => {
            currentFlicker.classList.remove('flicker');
        }, flickerDuration);

        // Flicker neighboring letters with a 50% chance
        if (Math.random() < 0.5) {
            const nextIndex = randomIndex + 1;
            if (nextIndex < allSpans.length && allSpans[nextIndex].textContent !== ' ') {
                allSpans[nextIndex].style.animationDuration = '0.2s';
                allSpans[nextIndex].classList.add('flicker');

                // Remove neighboring flicker after a random duration
                setTimeout(() => {
                    allSpans[nextIndex].classList.remove('flicker');
                }, flickerDuration);
            }
        }

        // Set a random delay for the next flicker (between 1 and 5 seconds)
        const delay = Math.random() * 4000 + 1000; // Random delay between flickers
        setTimeout(flickerLetter, delay);
    }

    // Start the first flicker
    flickerLetter();
}
