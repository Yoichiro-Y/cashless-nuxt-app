import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const campaignsRef = db.collection('campaigns')

export const state = () => ({
  campaigns: [],
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('campaigns', campaignsRef)
  }),
  count: firestoreAction((context, name) => {
    if(name.trim()) {
      campaignsRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  goodCount: firestoreAction((context, { id, reviewId}) => {
    console.log(id + ':' + reviewId)
    let review = campaignsRef.doc(id).collection('reviews').doc(reviewId)
    review.get().then((doc) => {
      review.update({
        good: doc.data().good + 1
      })
    })
  }),
}

export const getters = {
  orderdCampaigns: state => {
    return _.sortBy(state.campaigns, 'created')
  }
}