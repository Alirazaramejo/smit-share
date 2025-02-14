import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDG6-ZhFAuf2xkIVjieFKPzYXylqsASeXU",
    authDomain: "smit-batch-10.firebaseapp.com",
    projectId: "smit-batch-10",
    storageBucket: "smit-batch-10.appspot.com",
    messagingSenderId: "333213670128",
    appId: "1:333213670128:web:b7d83af5afed979bafc035",
    databaseURL: "https://smit-batch-10-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase();
const storage = getStorage();

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db,
    ref,
    set,
    onValue,
    remove,
    storage,
    storageRef,
    uploadBytesResumable,
    getDownloadURL
}