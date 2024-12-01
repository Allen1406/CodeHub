// Typing animation effect for dynamic text in the hero section
const dynamicText = document.getElementById("dynamic-text");
const textArray = ["CodeHub", "Web Developer", "Problem Solver", "Designer"];
let textIndex = 0; // Index for phrases
let charIndex = 0; // Index for characters in the current phrase

function typeText() {
    if (charIndex < textArray[textIndex].length) {
        dynamicText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 150); // Speed of typing each character
    } else {
        setTimeout(deleteText, 1000); // Pause before deleting the text
    }
}

function deleteText() {
    if (charIndex > 0) {
        dynamicText.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, 100); // Speed of deleting each character
    } else {
        textIndex = (textIndex + 1) % textArray.length; // Move to the next phrase
        setTimeout(typeText, 200); // Start typing the next phrase
    }
}

// Start the typing effect on page load
typeText();

// Show More/Less functionality in "About Me" section
const showMoreBtn = document.getElementById('show-more-btn');
const extraInfo = document.getElementById('extra-info');

showMoreBtn.addEventListener('click', () => {
    extraInfo.classList.toggle('hidden'); // Toggles the 'hidden' class
    showMoreBtn.textContent = extraInfo.classList.contains('hidden') ? "Show More" : "Show Less";
});

// Greet the user in the Contact section
function greetUser() {
    const nameInput = document.getElementById('name-input').value;
    const greetingMessage = document.getElementById('greeting-message');

    if (nameInput) {
        greetingMessage.textContent = `Hello, ${nameInput}! Thank you for visiting my website.`;
    } else {
        greetingMessage.textContent = 'Hello! Please enter your name.';
    }
}

// Add hover animation to the hero header
const heroText = document.querySelector("#hero h1");

heroText.addEventListener("mouseover", () => {
    heroText.style.color = "#ffa500";
    heroText.style.transition = "color 0.5s ease";
});
heroText.addEventListener("mouseout", () => {
    heroText.style.color = "#fff";
});

// Animated button in the "Contact" section
const greetingBtn = document.querySelector("#contact .btn");
const greetingMessage = document.getElementById("greeting-message");

greetingBtn.addEventListener("click", () => {
    greetingMessage.classList.add("fade-in");
    setTimeout(() => greetingMessage.classList.remove("fade-in"), 3000);
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll("header nav ul li a");
navLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for header height
            behavior: "smooth",
        });
    });
});
