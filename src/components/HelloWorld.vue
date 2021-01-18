<template>
  <div class="test-app">
    {{ msg }}
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello World'
    }
  },
  setup(props) {
    const msg1 = computed(() => props.msg)
    return {
      msg1
    }
  }
})
</script>
