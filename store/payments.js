import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const paymentsRef = db.collection('payments')

export const state = () => ({
  payments: [],
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('payments', paymentsRef)
  }),
  goodCount: firestoreAction((context, { id, reviewId}) => {
    console.log(id + ':' + reviewId)
    let review = paymentsRef.doc(id).collection('reviews').doc(reviewId)
    review.get().then((doc) => {
      review.update({
        good: doc.data().good + 1
      })
    })
  }),
}

export const getters = {
  orderedPayments: state => {
    return _.sortBy(state.payments, 'created')
  }
}