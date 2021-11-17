<template>
  <div class="home block xxx">
    <app-icon icon="dashboard" is-custom-svg />
    <app-icon icon="ri-home-line" />
    <app-icon icon="el-apple" />
    <router-link to="/about">about</router-link>
    {{ app.name }}
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/AppIcon'
import { useUser } from '@/store/modules/user'
const app = useUser()

</script>
<style lang="scss" scoped>
</style>
