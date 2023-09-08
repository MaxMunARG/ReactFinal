import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNp2otCHLO5EoJpoqlx67VyEYo1NbMTJQ",
  authDomain: "reactcoder-acabd.firebaseapp.com",
  projectId: "reactcoder-acabd",
  storageBucket: "reactcoder-acabd.appspot.com",
  messagingSenderId: "416632238584",
  appId: "1:416632238584:web:a28537b8e0d23345f5260d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);