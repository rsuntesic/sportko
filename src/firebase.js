import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyB84YfuxVlX8N_XFJ82QuQ28sjU-UyFK-Q",
    authDomain: "sportko-daf1d.firebaseapp.com",
    projectId: "sportko-daf1d",
    storageBucket: "sportko-daf1d.appspot.com",
    messagingSenderId: "140017467426",
    appId: "1:140017467426:web:e7a55f2e9e9a37b61c8a7b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();
  let storage = firebase.storage();

  export  { firebase, db, storage };