<template>
<!-- Блок для работы со списком юзеров (поиск и выбор колличества эл. на странице)-->
    <div class="action">
        <action-search />
        <action-filter />
    </div>
</template>

<script>
import ActionSearch from './ActionSearch'
import ActionFilter from './ActionFilter'
export default {
  name: 'Action',
  components: { ActionSearch, ActionFilter }
}
</script>

<style lang="scss">
.action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 4px solid #c8c8c8;
}
</style>
