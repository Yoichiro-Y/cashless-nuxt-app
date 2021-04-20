import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  add: firestoreAction((context, name) => {
    if(name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  }),
  login: firestoreAction((context)=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user;
      console.log('success : ' + user)
    }).catch(function(error) {
      var errorCode = error.code;
      console.log('error : ' + errorCode)
    });
  })
}

export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  }
}
