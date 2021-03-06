import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}; 

console.log(process.env)

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth()
        //get a reference to the databse service
        this.database = app.firestore()
    }

    doCreateUserWithEmailAndPassword=(email,password)=>
        this.auth.createUserWithEmailAndPassword(email,password);
    
    doSignInWithEmailAndPassword = (email,password) =>
        this.auth.signInWithEmailAndPassword(email,password);
    
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doSignOut = () => this.auth.signOut();

}

const firebase = new Firebase();

export default firebase;