//src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, 
        signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
     apiKey: "AIzaSyAqEjZ3DSxK7pJYvgRSAs-DxV0TpCJbvKE",
     authDomain: "moviesdailyrn.firebaseapp.com",
     projectId: "moviesdailyrn",
     storageBucket: "moviesdailyrn.appspot.com",
     messagingSenderId: "33894578064",
     appId: "1:33894578064:web:357382e20df1ae190a2515",
     measurementId: "G-7TG8EYND5Q"
    };

initializeApp(firebaseConfig);

//init services
const auth = getAuth();

export {auth,createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut}
