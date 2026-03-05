<div align="center">
  <img src="public/og-image.png" alt="Easwari Associates Logo" width="300" />

  # EASWARI ASSOCIATES
  **"Here Trust Meets Tireless Precision."**

  *A Premium Digital Experience for Pallipalayam's Leading Audit, Tax & Financial Consultancy.*

  [![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)](https://firebase.google.com/)
  [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://en.wikipedia.org/wiki/HTML5)
  [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://en.wikipedia.org/wiki/CSS)
  [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 🌟 Overview

Welcome to the official source code for **Easwari Associates**, a premium, performance-optimized, and visually stunning digital presence. Designed with a **"Zurich private bank meets South Indian heritage"** aesthetic, this project transcends standard business sites by applying luxury design principles, high-end interactivity, and enterprise-grade SEO.

---

## ✨ Signature Features

### 🎨 Visual & Experiential Excellence
- **Vanta.js 3D Hero:** A dynamic, interactive particle network that brings the landing page to life.
- **GSAP Animations:** Smooth, staggered reveals and scroll-triggered animations powered by GreenSock.
- **Lenis Smooth Scroll:** Buttery-smooth, lightweight scrolling mechanics for an elevated browsing experience.
- **Glassmorphism & Tilt Elements:** Premium vanilla-tilt.js cards, floating navigation, and deep-gold accenting.

### 🌐 Intelligent Integrations
- **EmailJS:** A secure, backend-less contact form that routes client inquiries instantly to the firm's email.
- **Tawk.to Live Chat:** An AI-ready, floating communication widget designed for instant visitor engagement.
- **Interactive Modals & Counters:** Built-in milestone counters and fluid mobile navigation layers.

### 📈 SEO, Analytics & Compliance
- **JSON-LD Schema Markup:** Complete *LocalBusiness* and *WebSite* schemas configured for maximum Google Search and Maps visibility.
- **Advanced Open Graph (OG) & Twitter Cards:** Fully optimized social sharing previews to ensure brand consistency across platforms.
- **Google Tag Manager (GTM) & GA4 Embedded:** Pre-configured event tracking (Property IDs `GTM-N3Q9S75N` & `G-SQ3QZHVJ8Q`).
- **Semantic HTML5:** High accessibility standards across all device ranges.

---

## 🛠️ Technology Stack

| Category         | Technologies Used                                                                 |
|------------------|-----------------------------------------------------------------------------------|
| **Frontend**     | HTML5, CSS3 (Vanilla Custom Properties), JavaScript (ES6+ Module Pattern)         |
| **Animations**   | GSAP, Three.js, Vanta.js, Vanilla-Tilt.js, Lenis                                 |
| **Integrations** | EmailJS (Forms), Tawk.to (Chat), Google Analytics 4, Firebase SDK (Optional)      |
| **Deployment**   | Firebase Hosting                                                                  |

---

## 📁 System Architecture

```text
/
├── public/                       # Deployment Root
│   ├── index.html                # Main entry point (Heavily Optimized)
│   ├── og-image.png              # Brand preview banner for SEO
│   ├── favicon.ico               # Website icon
│   ├── css/
│   │   └── styles.css            # Custom design system, tokens & animations
│   └── js/
│       ├── main.js               # Application logic, Form handling & Scripts
│       └── firebase-config.js    # Firebase initialization (Module)
├── firebase.json                 # Firebase deployment configuration
└── README.md                     # Documentation (You are here)
```

---

## 💻 Local Development Setup

Because this project utilizes ES6 modules (`type="module"`) and advanced Three.js rendering, running it directly from the file system (`file://`) will trigger CORS policies. A local web server is required.

**Prerequisites:** [Node.js](https://nodejs.org/) installed on your machine.

1. **Install a local web server (if you don't have one):**
   ```bash
   npm install -g serve
   ```

2. **Run the local environment:**
   ```bash
   # Make sure you are in the root directory
   serve public
   ```

3. **View the live site:** 
   Open your browser and navigate to the address provided in your terminal (typically `http://localhost:3000`).

---

## 🚀 Deployment (Firebase Hosting)

This repository is pre-configured for **Firebase Hosting**. 

1. **Authenticate the Firebase CLI:**
   ```bash
   firebase login
   ```

2. **Initialize the Project (if not already done):**
   ```bash
   firebase init hosting
   # When prompted, set "public" as your public directory.
   ```

3. **Deploy to Production:**
   ```bash
   firebase deploy --only hosting
   ```

---

## ✉️ Environment Configuration (EmailJS & Tawk.to)

If migrating to new accounts, ensure the following API keys are updated in `/public/js/main.js` and HTML:

- **EmailJS Configuration:** Find `emailjs.init("YOUR_PUBLIC_KEY")` and your `Service ID` / `Template ID` in `main.js`.
- **Tawk.to Script:** Included directly in the `<head>` of `index.html`. 

---

<div align="center">
  <p><strong>EASWARI ASSOCIATES</strong></p>
  <p><em>Crafted with Unwavering Precision by <a href="#">Jai Synergiz Solutions</a> / JAI KARTHICK T.S.</em></p>
</div>
