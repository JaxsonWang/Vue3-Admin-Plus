<template>
  <div class="home">
    <hello-world msg="test" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
