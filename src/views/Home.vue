<template>
  <div class="home block xxx">
    <app-icon icon="dashboard" is-custom-svg />
    <app-icon icon="ri-home-line" />
    <router-link to="/about">about</router-link>
    <el-tag>{{ obj.a }}</el-tag>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/AppIcon'
import { reactive } from 'vue'

let count = $ref(1)
let value2 = $computed(() => {
  return count * 2
})
count++
// console.log(value2)
let obj = reactive({
  a: 1,
  b: 2
})

setInterval(() => {
  obj.a++
}, 1000)
</script>
<style lang="scss" scoped>
</style>
