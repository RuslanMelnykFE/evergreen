export default {
  namespaced: true,
  state: {
    search_users: null // Масив результата поиска юзеров по имени
  },
  mutations: {
    searchUsers (state, value) {
      state.search_users = value
    }
  }
}
