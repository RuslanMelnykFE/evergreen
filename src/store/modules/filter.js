export default {
  namespaced: true,
  state: {
    quantity: 5 // Количество элементов на странице, изменяется в зависимости от select
  },
  mutations: {
    changeQuantity (state, value) {
      state.quantity = value
    }
  }
}
