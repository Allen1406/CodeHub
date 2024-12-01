import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_78CYzfsDnAEvs0q7PH5PBnUKcl8KVSU",
    authDomain: "codehub-1424.firebaseapp.com",
    projectId: "codehub-1424",
    storageBucket: "codehub-1424.firebasestorage.app",
    messagingSenderId: "475778541364",
    appId: "1:475778541364:web:4da85aa2fb787ba4a52761",
    measurementId: "G-FBMKPL16ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission for custom validation

        // Clear previous error messages
        clearErrors();

        // Get form field values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const projectDescription = document.getElementById('project-description').value.trim();
        const budget = document.getElementById('budget').value.trim();

        let hasError = false;

        // Validate Name
        if (name === "") {
            showError("name", "Name is required.");
            hasError = true;
        }

        // Validate Email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "") {
            showError("email", "Email is required.");
            hasError = true;
        } else if (!emailRegex.test(email)) {
            showError("email", "Please enter a valid email address.");
            hasError = true;
        }

        // Validate Phone
        const phoneRegex = /^\d{10}$/;
        if (phone === "") {
            showError("phone", "Phone number is required.");
            hasError = true;
        } else if (!phoneRegex.test(phone)) {
            showError("phone", "Please enter a valid phone number (10 digits).");
            hasError = true;
        }

        // Validate Project Description
        if (projectDescription === "") {
            showError("project-description", "Project description is required.");
            hasError = true;
        }

        // Validate Budget
        if (budget === "") {
            showError("budget", "Estimated budget is required.");
            hasError = true;
        }

        // If there are no errors, store the quote data in Firestore
        if (!hasError) {
            const quote = {
                name,
                email,
                phone,
                projectDescription,
                budget,
                timestamp: serverTimestamp(), // Add timestamp for reference
            };

            // Store the quote in Firestore
            try {
                await addDoc(collection(db, 'quotes'), quote);
                alert('Quote submitted successfully!');
                form.reset(); // Reset the form after submission
                window.location.href = "confirmation.html"; // Redirect to confirmation page
            } catch (error) {
                console.error('Error submitting quote: ', error);
                alert('There was an error submitting the quote. Please try again.');
            }
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;

        field.parentElement.appendChild(errorMessage);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.remove();
        });
    }
});
