import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { getDatabase, ref, set as setFromDb } from "firebase/database";

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROD_APP_ID,
};

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
const config = {
  apiKey: "AIzaSyCbpKTn8DkXoHP5x-m9LIW400kIE3EP5Lw",
  authDomain: "fir-project-280ef.firebaseapp.com",
  projectId: "fir-project-280ef",
  storageBucket: "fir-project-280ef.appspot.com",
  messagingSenderId: "985783627655",
  appId: "1:985783627655:web:885badd5a1dbafbe8c2d22",
  measurementId: "G-BYHH2JE2SV",
};

class Firebase {
  static count = 0;

  constructor() {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.db = getDatabase(this.app);

    // Check how many times this obj is created
    console.log("Firebase created: " + Firebase.count++);
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => signOut(this.auth);

  doPasswordReset = (email) => sendPasswordResetEmail(this.auth, email);

  doPasswordUpdate = (password) =>
    updatePassword(this.auth.currentUser, password);

  // User API
  user = (uid) => ref(this.db, `users/${uid}`);

  users = () => ref(this.db, "users");

  set = (ref, obj) => setFromDb(ref, obj);
}

export default Firebase;
