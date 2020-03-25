<template>
  <router-link :to="user_link" class="user">
    <img :src="user_image" alt="user_image" class="user__image" />
    <span class="user__name">{{first_name}} {{last_name}}</span>
    <span class="user__show" @click.stop.prevent="getUser(id)">show more</span>
  </router-link>
</template>

<script>
export default {
  name: 'UsersItem',
  props: {
    id: {
      type: Number,
      required: true,
      default: null
    },
    user_image: {
      type: String,
      required: true,
      default: ''
    },
    first_name: {
      type: String,
      required: true,
      default: ''
    },
    last_name: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    user_link () {
      const link = '/user/'
      return link + this.id
    }
  },
  methods: {
    // Метод для перехода на страницу выбранного юзера и его поиск в коллекции юзеров
    getUser (id) {
      this.$router.push(this.user_link)
      const user = this.$store.state.users.users.find(item => item.id === id)
      this.$store.dispatch('users/getUser', user)
    }
  }
}
</script>

<style lang="scss">
.user {
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  &__image {
      max-width: 76px;
      width: 100%;
      margin-right: 20px;
      display: block;
  }
  &__name {
      font-size: 20px;
      color: #848789;
  }
  &__show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 27px 0;
    font-size: 20px;
    font-weight: 700;
    vertical-align: middle;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    background-color: #64c29e9d;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease-in;
  }
  &:hover {
    .user__show {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
