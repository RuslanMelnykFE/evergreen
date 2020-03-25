<template>
  <div class="pagination">
    <button class="button button__prev"
            :class="{'button_disable' : disable_prev}"
            @click.stop.prevent="prev">prev</button>
    <button v-for="item in pages"
            :key="item" class="button button__page"
            :class="{'button_active' : item === select_page}"
            @click.stop.prevent="selectPage(item)">{{item}}</button>
    <button class="button button__next" :class="{'button_disable' : disable_next}"
            @click.stop.prevent="next">next</button>
  </div>
</template>

<script>
// Функция получения динамического массива номеров страниц
const getNumberPages = value => {
  const arr = []
  for (let item = 0; item < value; item++) {
    item = item++
    arr.push(item + 1)
  }
  return arr.length !== 0 ? arr : 1
}

export default {
  name: 'Pagination',
  computed: {
    // Получение колличества страниц в зависимости от значения select
    value_pages () {
      const totalUsers = this.$store.state.users.total_users
      const quantity = this.$store.state.filter.quantity
      const number = Math.ceil(totalUsers / quantity)
      this.$store.commit('pagination/totalPages', number)
      return number
    },
    // Количество страниц полученное с сервера
    total_pages () { return this.$store.state.users.total_pages },
    // Номер загруженной страницы
    page () { return this.$store.state.users.page },
    // Получения колличества страниц
    pages () { return getNumberPages(this.value_pages) },
    // Номер текущей страницы
    select_page () { return this.$store.state.pagination.select_page },
    disable_prev () { return this.select_page === 1 },
    disable_next () { return this.select_page === this.pages.length }
  },
  methods: {
    // Выбор страницы при нажтий на кнопку с номером страницы
    selectPage (value) {
      this.$store.commit('pagination/selectPage', value)
    },
    // Переход по страницам назад
    prev () {
      const value = this.select_page
      if (!this.disable_prev) this.$store.commit('pagination/selectPage', value - 1)
    },
    // Переход по страницам вперед
    next () {
      const value = this.select_page
      if (!this.disable_next) this.$store.commit('pagination/selectPage', value + 1)
    }
  },
  watch: {
    // Отслеживание выбранной стрници для загрузки необходимых юзеров с сервера
    select_page () {
      const checkPage = this.select_page > 1 && this.page < this.total_pages
      if (checkPage) this.$store.dispatch('users/getUsers', this.page + 1)
    }
  }
}
</script>

<style lang="scss">
.pagination {
  max-width: 100%;
  width: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    padding: 4px 10px 6px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(0, 132, 255);
    background: none;
    border: 1px solid rgb(0, 132, 255);
    border-left: none;
    &__prev {
      border: 1px solid rgb(0, 132, 255);
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }
    &__next {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
    &_active {
      background-color: rgba(75, 168, 255, 0.637);
    }
    &_disable {
      background-color: rgb(211, 211, 211);
      color: rgba(151, 151, 151, 0.822);
      border: 1px solid rgb(151, 151, 151);
    }
  }
}
</style>
