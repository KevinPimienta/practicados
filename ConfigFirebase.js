import firebase from 'firebase/app';
import 'firebase/database';

const config={
    apiKey: "AIzaSyCddnMQJ-2aWQ6uQXgWMXp25pteNuEfk1Q",
    authDomain: "reactnative-bc52a.firebaseapp.com",
    projectId: "reactnative-bc52a",
    storageBucket: "reactnative-bc52a.appspot.com",
    messagingSenderId: "332683887337",
    appId: "1:332683887337:web:68e774c947d906d0276678",
    measurementId: "G-L42LX3B4D3"
}

const fb = !firebase.apps.lenght ? firebase.initializeApp(config):firebase.app()

export default fb;