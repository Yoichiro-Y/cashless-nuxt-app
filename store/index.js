import { vuexfireMutations } from 'vuexfire'

export const mutations = {
    ...vuexfireMutations
}
export const actions = {
    twitterSignIn({ dispatch }) {
      firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider())
      dispatch('twitterAuthStateChanged')
    },
    twitterSignOut({ dispatch }) {
      firebase.auth().signOut()
      dispatch('twitterAuthStateChanged')
    },
    twitterAuthStateChanged({ dispatch, commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const { displayName, uid } = user
          commit('storeAuthInfo', {
            userName: displayName,
            firebaseUid: uid
          })
        } else {
          commit('deleteAuthInfo')
        }
      })
    }
}