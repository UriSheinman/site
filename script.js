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

// Function to handle the click on the main content
let clickCount = 0; // Counter to track clicks

function handleClick() {
    clickCount++;
    
    switch (clickCount) {
        case 1:
            alert("I'm Coming Like a Storm Into Your Town");
            break;
        case 2:
            alert("I'm Higher Than The Hope That You Brought Down");
            break;
        case 3:
            alert("You Can't Catch Me Now...");
            clickCount = 0; // Reset the click count for the next round
            break;
        default:
            break;
    }
}

// Attach event listeners to the elements
document.querySelector('header').addEventListener('click', redirectToUriSheinman);
document.querySelector('main h2').addEventListener('click', handleClick);


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

// Function to randomly flicker one letter at a time (excluding footer)
function startFlickeringEffect() {
    // Get all spans from header and main only
    const allSpans = document.querySelectorAll('header span, main span');
    let currentFlicker;

    function flickerLetter() {
        // Clear the previous flickering letter
        if (currentFlicker) {
            currentFlicker.classList.remove('flicker');
        }

        // Pick a random letter to flicker
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        currentFlicker = allSpans[randomIndex];
        currentFlicker.classList.add('flicker');

        // Set a random delay for the next flicker (between 1 to 5 seconds)
        const delay = Math.random() * 4000 + 1000;
        setTimeout(flickerLetter, delay);
    }

    // Start the first flicker
    flickerLetter();
}
