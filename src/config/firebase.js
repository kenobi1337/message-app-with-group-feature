import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAGhLHMDSTvFQQVT1yaujVtyq1HxTREkwc',
	authDomain: 'group-chat-fea90.firebaseapp.com',
	projectId: 'group-chat-fea90',
	storageBucket: 'group-chat-fea90.appspot.com',
	messagingSenderId: '213873137604',
	appId: '1:213873137604:web:fdae562905658c848db691',
	measurementId: 'G-RLK92YX337'
};

const firebaseApp = firebase.initializeApp(
	firebaseConfig
);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
