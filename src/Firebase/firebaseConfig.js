import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getDatabase} from "firebase/database"
// import firebase from "firebase"

const firebaseConfig = {

  apiKey: "AIzaSyBoR8_flXMMwgKvRDNNquOzbglfQbl1d5M",
  authDomain: "bejamasshoprecord.firebaseapp.com",
  projectId: "bejamasshoprecord",
  storageBucket: "bejamasshoprecord.appspot.com",
  messagingSenderId: "466828232656",
  appId: "1:466828232656:web:13a93e6bc297d91b855bd5",
  measurementId: "G-6WLFVJGJ61"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig)
// export const db = getDatabase(app);
// export default db;
export const database = getFirestore(app);
 