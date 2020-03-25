<template>
  <div class="home">
    <div class="container">
      <Action />
      <Users />
      <Pagination />
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action/Action.vue'
import Users from '@/components/Users/Users.vue'
import Pagination from '@/components/Pagination/Pagination.vue'

export default {
  name: 'Home',
  components: {
    Action, Users, Pagination
  },
  created () {
    this.$store.dispatch('users/getUsers', 1)
  }
}
</script>
