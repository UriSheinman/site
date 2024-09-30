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


// Function to wrap each character in a span and apply the flickering effect
function wrapCharactersWithSpan(element) {
    const text = element.textContent; // Get the original text
    const wrappedText = text.split('').map(char => `<span>${char}</span>`).join(''); // Wrap each character in a span
    element.innerHTML = wrappedText; // Replace the original text with the wrapped text
}

// Apply the wrapping to all target elements
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');
    const footerText = document.querySelector('footer p');

    // Wrap characters with span for flickering effect
    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);
    wrapCharactersWithSpan(footerText);
});
