<template>
  <div class="test-app">
    {{ msg }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello World'
    }
  }
})
</script>
