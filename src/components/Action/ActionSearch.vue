<template>
<!-- Блок поиска юзеров по имени -->
  <form action class="action__search">
    <label for="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 16 16"
        version="1.1"
        width="64px"
        height="64px"
      >
        <g id="surface1">
          <path
            style=" "
            d="M 10.5 1 C 8.019531 1 6 3.019531 6 5.5 C 6 6.558594 6.382813 7.523438
          7 8.292969 L 2.023438 13.269531 L 2.726563 13.980469 L 7.707031 9 C 8.476563 9.617188 9.441406 10
          10.5 10 C 12.980469 10 15 7.980469 15 5.5 C 15 3.019531 12.980469 1 10.5 1 Z M 10.5 2 C 12.4375 2
          14 3.5625 14 5.5 C 14 7.4375 12.4375 9 10.5 9 C 8.5625 9 7 7.4375 7 5.5 C 7 3.5625 8.5625
          2 10.5 2 Z "
          />
        </g>
      </svg>
    </label>
    <input type="text" id="search" placeholder="Search" v-model="search_name" @input="searchName"/>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ActionSearch',
  data () {
    return {
      search_name: ''
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.users // Массив юзеров
    })
  },
  methods: {
    // Поиск юзеров по введенному имени
    searchName () {
      const searchUsers = this.users.filter(item =>
        item.first_name.toLowerCase().includes(this.search_name.toLowerCase())
      )
      this.$store.commit('search/searchUsers', searchUsers)
    }
  },
  watch: {
    // Отслеживание введенных данных
    search_name () {
      this.searchName()
    }
  }
}
</script>

<style lang="scss">
.action__search {
  position: relative;
  padding-right: 50px;
  flex: 0 1 50%;
  label {
    position: absolute;
    top: calc(50% - 15px);
    left: 5px;
    border-right: 2px solid #c8c8c8;
    padding: 4px 5px 0;
    svg {
      width: 23px;
      height: 23px;
    }
  }
  input {
    width: 100%;
    padding: 5px 0 5px 45px;
    line-height: 20px;
    font-size: 18px;
    border: 2px solid #c8c8c8;
    border-radius: 15px;
  }
}
</style>
