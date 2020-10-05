import firebase from "firebase";

// only used for forget password, db access denied compeletly for client
const firebaseConfig = {
    apiKey: "AIzaSyC8gHgffmgfNvL_6EB678f4qYVeITqQPEw",
    authDomain: "classai.firebaseapp.com",
    databaseURL: "https://classai.firebaseio.com",
    projectId: "classai",
    storageBucket: "classai.appspot.com",
    messagingSenderId: "469042969985",
    appId: "1:469042969985:web:c8664da21c9cc7f5637c80",
    measurementId: "G-XV09MJ8H60",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
