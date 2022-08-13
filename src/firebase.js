// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFeBtnyT1JcDesjfMQ4-bydNfdG-0OpDg",
    authDomain: "manager-4fde9.firebaseapp.com",
    projectId: "manager-4fde9",
    storageBucket: "manager-4fde9.appspot.com",
    messagingSenderId: "167662121926",
    appId: "1:167662121926:web:e7bcc287efb620aabb38c7"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = getAuth(app);

export { auth, db };



