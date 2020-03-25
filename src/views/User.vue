<template>
  <div class="container">
    <div class="nav">
      <router-link to="/">Users/</router-link>
      <span> User: {{ user.first_name }} {{ user.last_name}}/</span>
    </div>
    <!-- Блок информации о юзере -->
    <div class="views__user">
      <h3> {{ user.first_name }} {{ user.last_name}}</h3>
      <img :src="user.avatar" alt="">
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    user () {
      return this.$store.state.users.user
    }
  }
}
</script>

<style lang="scss">
.views__user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
