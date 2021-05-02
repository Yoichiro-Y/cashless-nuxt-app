export default {
    async showFlashMessage({commit}, message) {
      commit('setMessage', message);
    }
  }