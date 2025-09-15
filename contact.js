// ===============================
// Contact Form Functionality with EmailJS
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init("NKwdRkVcolYVYYuqZ"); // <-- yaha apni public key likho

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }

    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach((button) => {
        button.addEventListener("click", handleSmoothScroll);
    });
});

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = {};
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }

    if (validateForm(formObject)) {
        showLoadingState();

        // Send email via EmailJS
        emailjs.send(
            "service_ezsjhjs",   // <-- yaha service id
            "template_btar67h",  // <-- yaha template id
            {
                from_name: formObject.name,
                from_email: formObject.email,  // Reply-To
                subject: formObject.subject,
                message: formObject.message
            }
        )
        .then(function () {
            showSuccessMessage();
            resetForm();
        })
        .catch(function (error) {
            showErrorMessage(["Something went wrong: " + error.text]);
            resetSubmitButton();
        });
    }
}

// ===============================
// Form Validation
// ===============================
function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push("Please enter a valid email address");
    }

    if (!data.subject || data.subject.trim().length < 3) {
        errors.push("Subject must be at least 3 characters long");
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push("Message must be at least 10 characters long");
    }

    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }

    return true;
}

// ===============================
// UI Feedback Functions
// ===============================
function showLoadingState() {
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
}

function showSuccessMessage() {
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.textContent = "Message Sent! ✓";
    submitBtn.style.background = "#22c55e";
    submitBtn.style.borderColor = "#22c55e";
    showNotification("Message sent successfully! I'll get back to you soon.", "success");

    setTimeout(() => {
        resetSubmitButton();
    }, 3000);
}

function showErrorMessage(errors) {
    showNotification(errors.join(", "), "error");
}

function showNotification(message, type) {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        color: #fff;
        font-size: 0.9rem;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    if (type === "success") {
        notification.style.background = "#22c55e";
        notification.style.border = "1px solid #16a34a";
    } else {
        notification.style.background = "#ef4444";
        notification.style.border = "1px solid #dc2626";
    }

    document.body.appendChild(notification);

    setTimeout(() => { notification.style.transform = "translateX(0)"; }, 100);
    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function resetSubmitButton() {
    const submitBtn = document.querySelector(".submit-btn");
    const originalText = submitBtn.dataset.originalText || "Send Message";
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.background = "#000";
    submitBtn.style.borderColor = "#444";
}

function resetForm() {
    document.getElementById("contactForm").reset();
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}


