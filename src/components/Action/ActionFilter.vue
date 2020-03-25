<template>
<!-- Блок выбора колличества эл. на странице -->
  <form action class="action__filter">
    <div class="arrow-bottom"></div>
    <select name id="filter" v-model="quantity">
      <option v-for="(item, index) in amount_elements"
              :key="index" :value="item">{{ item }}</option>
    </select>
  </form>
</template>

<script>
import { mapState } from 'vuex'

// Функция получения динамического массива опций для select зависит от полученных данных с сервера
const getAmountElements = (value) => {
  const arr = [5]
  for (let index = 0; index < value; index++) {
    let item = arr[index]
    item = item + 5
    arr.push(item)
  }
  return arr
}
export default {
  name: 'ActionFilter',
  computed: {
    // Заданые опции для select
    quantity: {
      get () { return this.$store.state.filter.quantity },
      set (value) {
        return this.$store.commit('filter/changeQuantity', value)
      }
    },
    ...mapState({
      page: state => state.users.page,
      total_pages: state => state.users.total_pages,
      per_page: state => state.users.per_page,
      total_users: state => state.users.total_users
    }),
    // Массив значений опций селекта
    amount_elements () {
      const value = Math.ceil(this.total_users / this.per_page)
      return getAmountElements(value)
    }
  },
  watch: {
    // Отслеживание измения значения селекта для загрузки необходимых юзеров с сервера
    quantity () {
      const checkPage = this.quantity > this.per_page && this.page < this.total_pages
      if (checkPage) this.$store.dispatch('users/getUsers', this.page + 1)
    }
  }
}
</script>

<style lang="scss">
.action__filter {
    position: relative;
  flex: 0 1 50%;
  display: flex;
  justify-content: flex-end;
  select {
    -webkit-appearance: none;
       -moz-appearance: none;
        -ms-appearance: none;
            appearance: none;
    max-width: 100px;
    width: 100%;
    padding: 5px 20px 5px 35px;
    line-height: 18px;
    font-size: 16px;
    border: 2px solid #c8c8c8;
    border-radius: 15px;
  }
  .arrow-bottom {
      position: absolute;
      top: 50%;
      right: 17px;
      &::before,
      &::after {
          content: "";
          position: absolute;
           top: 0;
          width: 10px;
          border: 1px solid #c8c8c8;
          transition: .3s ease-in;
      }
      &::before {
          left: -2px;
          transform: rotate(-45deg);
      }
      &::after {
          right: -2px;
          transform: rotate(45deg);
      }
      &_active {
          &::before {
          transform: rotate(45deg);
        }
        &::after {
            transform: rotate(-45deg);
        }
      }
  }
}
</style>
