<template>
  <div class="app-wrapper">
    <div><router-link to="/dashboard">Link 1</router-link></div>
    <div><router-link to="/about">Link 2</router-link></div>
    <sidebar class="sidebar-container" />
    <navbar />
    <app-main />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Sidebar, Navbar, AppMain } from './components'

export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
})
</script>
<style lang="scss" scoped>
</style>
