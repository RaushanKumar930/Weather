import firebase from "firebase";
//import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_Yr6hK37zVvBlowZSf6pPd4XCRMIQVEI",
    authDomain: "aptreact-8ba87.firebaseapp.com",
    projectId: "aptreact-8ba87",
    storageBucket: "aptreact-8ba87.appspot.com",
    messagingSenderId: "896069072248",
    appId: "1:896069072248:web:28e020d4eb88ee821e848d"
  };

  const app= firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore();