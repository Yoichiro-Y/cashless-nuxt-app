import firebase from 'firebase'
import 'firebase/auth' 

if (!firebase.apps.length) {
    firebase.initializeApp({
      FIREBASE_PROJECT_ID: 'nuxt-app-14dab',
      apiKey: "AIzaSyA9lETh5nYggirR6v8lIOBm5qhQMJ875yc",
      authDomain: "nuxt-app-14dab.firebaseapp.com",
      databaseURL: "https://nuxt-app-14dab.firebaseio.com",
      projectId: "nuxt-app-14dab",
      storageBucket: "nuxt-app-14dab.appspot.com",
      messagingSenderId: "828408006213",
      appId: "1:828408006213:web:8ec13cc71d7129d914052c"
    }
  )
}

export default firebase
export const firestore = firebase.firestore();
export const storage = firebase.storage();
