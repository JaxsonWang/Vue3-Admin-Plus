<template>
  <div class="home block xxx">
    <app-icon icon="dashboard" is-custom-svg />
    <app-icon icon="ri-home-line" />
    <router-link to="/about">about</router-link>
    {{ getName }}
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/AppIcon'
import { useUser } from '@/store/modules/user'
const { name: getName } = useUser()
</script>
<style lang="scss" scoped>
</style>
