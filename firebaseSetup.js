import { initializeApp } from 'firebase/app';



const firebaseConfig = {
    apiKey: "AIzaSyAqEjZ3DSxK7pJYvgRSAs-DxV0TpCJbvKE",
    authDomain: "moviesdailyrn.firebaseapp.com",
    projectId: "moviesdailyrn",
    storageBucket: "moviesdailyrn.appspot.com",
    messagingSenderId: "33894578064",
    appId: "1:33894578064:web:357382e20df1ae190a2515",
    measurementId: "G-7TG8EYND5Q"
};

const app = initializeApp(firebaseConfig);

export  {app}; 

