<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'Link',
  props: {
    to: {
      type: String,
      default: '/'
    }
  },
  setup(props) {
    const isExt = computed(() => isExternal(props.to))
    const type = computed(() => (isExt.value ? 'a' : 'router-link'))
    const linkProps = to => {
      if (isExt.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }

    return {
      type,
      linkProps
    }
  }
})
</script>
