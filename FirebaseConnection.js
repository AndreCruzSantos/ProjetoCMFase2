import firebase from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAxdWpiRdhn2B_INeYWAqaS0K9awbJMyOM",
    authDomain: "agendyourselfbd.firebaseapp.com",
    databaseURL: "https://agendyourselfbd-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "agendyourselfbd",
    storageBucket: "agendyourselfbd.appspot.com",
    messagingSenderId: "303668905085",
    appId: "1:303668905085:android:ed94470101e9de2ad29d14",
    measurementId: "G-0HHKGBEY5Z"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};