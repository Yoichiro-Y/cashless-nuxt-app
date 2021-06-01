import * as firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreAction } from 'vuexfire'
import router from 'vue-router'


const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  users: [],
  error: '',
})

const mutations = {
    getApiInfo(state, payload) {
        state.error = payload.message
    }
}

export const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('users', usersRef)
    }),
    google() {
        return new Promise((reject) => {
            console.log('login')
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase
            .auth()
            .signInWithPopup(provider).then(function(result) {
                const user = result.user;
                console.log('success : ' + user)
            })
            .then(
                $nuxt.$router.push('/')
            )
            .catch(function(error) {
                reject(error)
            })
        })
      },
        login: firestoreAction((context, { email, password, router}) => {
            return new Promise((resolve, reject) => {
                firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(response => {
                    router.push('/')
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                    })
            })
            }),
  }
  
  export const getters = {
    orderdTodos: state => {
      return _.sortBy(state.todos, 'created')
    }
  }

