firebase.initializeApp({
  apiKey:            "AIzaSyD7QOy_Iv9-AxWmReQOfNCwLaFkEyZakM8",
  authDomain:        "atu-360.firebaseapp.com",
  projectId:         "atu-360",
  storageBucket:     "atu-360.firebasestorage.app",
  messagingSenderId: "820106715923",
  appId:             "1:820106715923:web:9c58af48af1dce06ac30e6"
});

var db      = firebase.firestore();
var auth    = firebase.auth();
var storage = firebase.storage();
