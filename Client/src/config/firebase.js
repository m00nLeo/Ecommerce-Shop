// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJCZHXEhL2vn04RbHohdG57mVS-rz76ik",
  authDomain: "mern-shop-2912.firebaseapp.com",
  projectId: "mern-shop-2912",
  storageBucket: "mern-shop-2912.appspot.com",
  messagingSenderId: "475500866008",
  appId: "1:475500866008:web:6f31a575b72f994cef6aad",
  measurementId: "G-L5VQSHBM6F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
