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

// Function to show an alert when the main content is clicked
function showAlert() {
    alert('Can You Catch Me?');
}

// Attach event listeners to the elements
document.querySelector('header').addEventListener('click', redirectToUriSheinman);
document.querySelector('main h2').addEventListener('click', showAlert);
