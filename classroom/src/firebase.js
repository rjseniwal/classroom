import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBgVQjc9smZCHaMZ8Ulfh0YrCxQlMCR8xY",
	authDomain: "smart-class-7757.firebaseapp.com",
	projectId: "smart-class-7757",
	storageBucket: "smart-class-7757.appspot.com",
	messagingSenderId: "633041452964",
	appId: "1:633041452964:web:4ca58cec1c3236ba094b31",
	measurementId: "G-E000M54N36",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
