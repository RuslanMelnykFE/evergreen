export default {
  namespaced: true,
  state: {
    select_page: 1, // Номер выбранной страницы при пагинации
    total_pages: null // Общее колличество страниц, изменяеться в зависимости от колличества эллементов на странице при select
  },
  mutations: {
    selectPage (state, value) {
      state.select_page = value
    },
    totalPages (state, value) {
      state.total_pages = value
    }
  }
}
