// Tester variable for manual control of birthday mode
const tester = true; // Set to true to activate birthday mode regardless of the date

// Function to check if today is the user's birthday
function isBirthday() {
    const today = new Date();
    return today.getDate() === 29 && today.getMonth() === 11; // December 29th
}

// Activate birthday mode if tester is true or if today is the birthday
const birthdayMode = tester || isBirthday();

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const main = document.createElement("main");
    const header = document.createElement("header");
    const footer = document.createElement("footer");

    // Header
    const title = document.createElement("h1");
    title.textContent = "URI SHEINMAN";
    header.appendChild(title);

    // Main content
    const greeting = document.createElement("h2");
    greeting.textContent = "Hi :)";
    const birthdayText = document.createElement("h2");
    birthdayText.textContent = "It's my birthday!";
    birthdayText.classList.add("birthday-text");

    main.appendChild(greeting);
    main.appendChild(birthdayText);
    body.appendChild(header);
    body.appendChild(main);
    body.appendChild(footer);

    // Footer
    const footerText = document.createElement("p");
    footerText.textContent = "© 2024 Uri Sheinman";
    footer.appendChild(footerText);

    // Update styles based on birthday mode
    if (birthdayMode) {
        body.style.backgroundColor = "#4B0E1D"; // Darker Bordeaux background
        greeting.style.color = "indigo"; // Indigo greeting
        greeting.style.textShadow = "0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6)"; // Gold glow
        birthdayText.style.color = "gold"; // Gold birthday text
        birthdayText.style.textShadow = "0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6)"; // Gold glow
        header.style.color = "gold"; // Gold header
        header.style.textShadow = "0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6)"; // Gold glow
        // Set particles and flicker effect for birthday mode
        setBirthdayFlicker(greeting);
        setBirthdayFlicker(birthdayText);
    } else {
        body.style.backgroundColor = "#4B0E1D"; // Default background
        greeting.style.color = "purple"; // Default text color
        greeting.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)"; // Default glow
        birthdayText.style.display = "none"; // Hide birthday text
        header.style.color = "royalblue"; // Royal blue header
        header.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)"; // Default glow
        // Restore normal flicker effect
        restoreNormalFlicker(greeting);
    }

    // Particles effect (to be kept in normal mode)
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
});

// Function to set flicker effect for birthday mode
function setBirthdayFlicker(element) {
    const text = element.textContent;
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        if (Math.random() < 0.5) {
            span.classList.add('flicker');
        }
        element.appendChild(span);
    }
}

// Function to restore normal flicker effect
function restoreNormalFlicker(element) {
    const text = element.textContent;
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        if (Math.random() < 0.2) { // Normal flicker probability
            span.classList.add('flicker');
        }
        element.appendChild(span);
    }
}