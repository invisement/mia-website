import { initializeApp } from "firebase/app";

// initialize firebase and give a handler to app
const firebaseConfig = {
    apiKey: "AIzaSyBq1Q40nwNOFnFBjkzs8oSn9Nf1-nZULFA",
    authDomain: "invisement-9ce58.firebaseapp.com",
    projectId: "invisement-9ce58",
    storageBucket: "invisement-9ce58.appspot.com",
    messagingSenderId: "895049073216",
    appId: "1:895049073216:web:f1397f0e1a3151855255a5",
    measurementId: "G-V6BHZ3X33V"
};

export const firebaseApp = initializeApp(firebaseConfig);

