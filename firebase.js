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

    // apiKey: "AIzaSyB0R50PA-Tt2i-rmMXs8mLrrxutrxK89Zo",
    // authDomain: "ronny-f1ba3.firebaseapp.com",
    // databaseURL: "https://ronny-f1ba3.firebaseio.com",
    // projectId: "ronny-f1ba3",
    // storageBucket: "ronny-f1ba3.appspot.com",
    // messagingSenderId: "144160356504",
    // appId: "1:144160356504:web:48ad2fbdaf15abd45b38ed"

}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
