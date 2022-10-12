import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQeaPUPpP_YLIqSfDiZWFAJaaTyogWvgw",
  authDomain: "technical-tasks.firebaseapp.com",
  projectId: "technical-tasks",
  storageBucket: "technical-tasks.appspot.com",
  messagingSenderId: "585064261760",
  appId: "1:585064261760:web:22235e3766a780a9571e65",
};

export const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
