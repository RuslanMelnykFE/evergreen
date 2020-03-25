import axios from 'axios'

export default {
  namespaced: true,
  state: {
    users: [], // Массив всех юзеров
    user: {}, // выбранный юзер
    total_users: null, // Общее колличество юзеров
    page: null, // Номер загруженной страницы
    per_page: null, // Количество юзеров на странице
    total_pages: null // Количество страниц
  },
  mutations: {
    users (state, value) {
      state.users = value
    },
    user (state, value) {
      state.user = value
    },
    page (state, value) {
      state.page = value
    },
    perPage (state, value) {
      state.per_page = value
    },
    totalUsers (state, value) {
      state.total_users = value
    },
    totalPages (state, value) {
      state.total_pages = value
    }
  },
  actions: {
    // Получение массива данных пользователей
    async getUsers ({ state, commit }, number) {
      const { data } = await axios.get(`https://reqres.in/api/users?page=${number}`)
        .catch(err => console.log(err))
      const users = state.users
      data.data.map(item => users.push(item))
      commit('users', users)
      commit('page', data.page)
      commit('perPage', data.per_page)
      commit('totalUsers', data.total)
      commit('totalPages', data.total_pages)
    },
    // Получение одного пользователя из коллекции пользователей
    getUser ({ commit }, obj) {
      commit('user', obj)
    }
  }
}
