<template>
  <div class="app-wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive :max="20">
        <transition mode="out-in" name="fade-transform">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

</style>
