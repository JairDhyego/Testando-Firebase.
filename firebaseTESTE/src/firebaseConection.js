import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDLAz3Hmb-JmyKb5AZ2rq-4p41Yh59i9pI",
  authDomain: "curso-c4f4a.firebaseapp.com",
  projectId: "curso-c4f4a",
  storageBucket: "curso-c4f4a.appspot.com",
  messagingSenderId: "434331395223",
  appId: "1:434331395223:web:bb2743d1796686df52b5d2",
  measurementId: "G-REGJLZGYCL"
};


if(!firebase.apps.length){

  firebase.initializeApp(firebaseConfig);
}

export default firebase