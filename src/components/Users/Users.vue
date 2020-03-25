<template>
  <div class="users">
    <!-- Список пользователей -->
    <ul class="users__list">
      <li v-for="item in filter_users" :key="item.id" class="users__item">
        <users-item
          :id="item.id"
          :user_image="item.avatar"
          :first_name="item.first_name"
          :last_name="item.last_name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import UsersItem from './UsersItem'

// Функция разделения общего массива юзеров в зависимости от значения select
const filterList = (arr, number) => arr.reduce((sliceList, element) => {
  const check = sliceList[sliceList.length - 1].length === number
  if (check) sliceList.push([])
  sliceList[sliceList.length - 1].push(element)
  return sliceList
}, [[]])

export default {
  name: 'Users',
  components: { UsersItem },
  computed: {
    // Значение select
    quantity () { return this.$store.state.filter.quantity },
    // Номер выбранной страницы
    select_page () { return this.$store.state.pagination.select_page },
    // Массив пользователей загруженный либо результат поиска по имени
    users () {
      const usersList = this.$store.state.users.users
      const searchUsers = this.$store.state.search.search_users
      return searchUsers || usersList
    },
    // Готовый масив юзеров который загружаеться на страницу
    filter_users () {
      const arrayLists = filterList(this.users, this.quantity)
      return arrayLists[this.select_page - 1]
    }
  }
}
</script>

<style lang="scss">
.users {
  max-width: 100%;
  width: 100%;
  padding-top: 20px;
  border-bottom: 4px solid #c8c8c8;
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-betwen;
    margin: 0;
    margin-left: -20px;
  }
  &__item {
    flex: 0 1 calc(50% - 20px);
    margin-right: 20px;
  }
}
</style>
