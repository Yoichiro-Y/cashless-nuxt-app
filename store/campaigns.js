import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'
import { _ } from 'core-js'

const db = firebase.firestore()
const campaignsRef = db.collection('campaigns')

export const state = () => ({
  campaigns: [],
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('campaigns', campaignsRef.where('end', '>', $nuxt.$dayjs().format('YYYY-MM-DD')))
  }),
  search: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('campaigns', campaignsRef.where('tag', 'array-contains', $nuxt.$route.query.search))
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
  orderedCampaigns: state => {
    return _.sortBy(state.campaigns, 'score').reverse()
  }
}