import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvEQDxyzzEDAXH7R7_WFi__5cuEhpakJw",
  authDomain: "quiz-platform-e84b7.firebaseapp.com",
  projectId: "quiz-platform-e84b7",
  storageBucket: "quiz-platform-e84b7.firebasestorage.app",
  messagingSenderId: "278519461397",
  appId: "1:278519461397:web:4cb508194bebe07869401c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
