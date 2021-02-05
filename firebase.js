import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCdA3J3231SG1LhDK7L78gK2QoEYKBaMlM",
    authDomain: "fypjames-a754f.firebaseapp.com",
    databaseURL: "https://fypjames-a754f.firebaseio.com",
    projectId: "fypjames-a754f",
    storageBucket: "fypjames-a754f.appspot.com",
    messagingSenderId: "131310800444",
    appId: "1:131310800444:web:b8074890fc73c55e0b3d39",
    measurementId: "G-ZR7T54L8Z9"

 
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()

/* information on installing firebase authentication https://rnfirebase.io/auth/usage */

// Setting up firebaseConfig and exporting db to components: https://blog.logrocket.com/storing-retrieving-data-react-native-apps-firebase/