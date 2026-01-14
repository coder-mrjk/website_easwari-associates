// ** Firebase SDK Import & Configuration Area (Your Firebase Details) **

// Your web app's Firebase configuration (PASTED DIRECTLY FROM YOUR INPUT)
const firebaseConfig = {
    apiKey: "AIzaSyC1jrYHnTiW4E7kB4IJshGC1i47iSnhCk4",
    authDomain: "office-website-696ce.firebaseapp.com",
    projectId: "office-website-696ce",
    storageBucket: "office-website-696ce.firebasestorage.app",
    messagingSenderId: "881098201759",
    appId: "1:881098201759:web:9ac5aec5cbca15bede60aa",
    measurementId: "G-SQ3QZHVJ8Q"
};

// Initialize Firebase app (using the version from your config)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
const app = initializeApp(firebaseConfig);

// Import other necessary Firebase services (ensure versions match 11.9.1)
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth, signInWithCustomToken, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Initialize Firebase Analytics (optional, based on your config)
const analytics = getAnalytics(app);

// --- Do NOT paste anything below this line for Firebase SDK setup ---

// This line determines the unique ID for your app's data in Firestore.
// If running in the Google Canvas environment, __app_id will be provided.
// For local disk, we'll use your Firebase Project ID as the appId.
const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.projectId;

// Initialize Firebase services (these assume 'app' is already initialized from your pasted code)
const db = getFirestore(app);
const auth = getAuth(app);

// Sign in anonymously (required for Firestore rules to allow writing in local/non-Canvas env)
(async () => {
    try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            // This path is for the Canvas environment (initial token provided by Canvas)
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            // This path is for local execution or non-Canvas environments (anonymous sign-in)
            await signInAnonymously(auth);
        }
        console.log("Firebase initialized and user signed in successfully.");
    } catch (error) {
        console.error("Error signing in to Firebase:", error);
        // Optionally, display an error message to the user if auth fails
    }
})();

// Make Firebase instances globally available for the form submission script
// This is important because the form's script runs outside the module scope
window.db = db;
window.auth = auth;
window.appId = appId;
// Make collection and addDoc globally available as well
window.collection = collection;
window.addDoc = addDoc;

export { app, db, auth, analytics, appId, collection, addDoc };
