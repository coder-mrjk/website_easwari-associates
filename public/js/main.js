// EmailJS Initialization
(function () {
    emailjs.init({
        publicKey: "ux-r6yJDR40lU1NYY",
    });
})();

// Form submission handling with Firebase and EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formMessage = document.getElementById('form-message');
        formMessage.classList.remove('hidden', 'text-green-600', 'text-red-600');
        formMessage.classList.add('text-gray-700');
        formMessage.textContent = 'Sending your message...';

        // Collect form data
        const formData = {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value,
            service: this.service.value,
            message: this.message.value,
            timestamp: new Date().toISOString()
        };

        // YOUR ACTUAL EMAILJS SERVICE ID AND TEMPLATE ID
        const serviceId = 'service_yjztyb9';   // <-- YOUR SERVICE ID
        const templateId = 'template_e2n18gl'; // <-- YOUR TEMPLATE ID

        try {
            // 1. Store in Firebase Firestore
            // Check if Firebase is available and authenticated before attempting to write
            if (window.db && window.auth && window.auth.currentUser && window.collection && window.addDoc) {
                const userId = window.auth.currentUser.uid;
                // window.appId is set in the module script based on Firebase projectId or Canvas __app_id
                const collectionPath = `artifacts/${window.appId}/users/${userId}/contact_submissions`;
                await window.addDoc(window.collection(window.db, collectionPath), formData); // Use addDoc and collection from window scope
                console.log("Form data successfully written to Firestore!");
            } else {
                console.warn("Firebase (Firestore/Auth/collection/addDoc) not fully initialized or user not authenticated. Skipping Firestore save. This can happen during local file:// testing or if setup is incomplete.");
                // Still attempt to send email if Firebase is not ready, as it's a separate service.
            }

            // 2. Send email via EmailJS (CORRECTED PARAMETER NAMES)
            await emailjs.send(serviceId, templateId, {
                name: formData.name, // Changed from from_name to name
                email: formData.email, // Changed from from_email to email
                phone: formData.phone, // Changed from phone_number to phone
                service: formData.service, // Changed from service_of_interest to service
                message: formData.message,
                timestamp: formData.timestamp, // Added timestamp
                to_name: "EASWARI ASSOCIATES" // You can set a specific recipient name
            });
            console.log("Email successfully sent via EmailJS!");

            formMessage.classList.remove('text-gray-700');
            formMessage.classList.add('text-green-600');
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            this.reset(); // Clear the form
        } catch (error) {
            console.error("Error submitting form:", error);
            formMessage.classList.remove('text-gray-700');
            formMessage.classList.add('text-red-600');
            formMessage.textContent = 'Error sending message. Please try again or contact us directly.';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 30;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (window.innerWidth < 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function () {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    });
}

// Scroll animations (IntersectionObserver)
const animateElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
});
animateElements.forEach(element => {
    observer.observe(element);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 80) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
});

// Animated Counters Logic
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+"; // Add plus sign at end
            }
        };
        updateCount();
    });
}

// Trigger counters when in view
let countersStarted = false;
const statsSection = document.getElementById('stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            animateCounters();
            countersStarted = true;
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
