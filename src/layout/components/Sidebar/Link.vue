<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script>
import { defineComponent, toRefs, computed } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'Link',
  setup(props) {
    const { to } = toRefs(props)
    const isExt = computed(() => isExternal(to))
    const type = computed(() => isExt.value ? 'a' : 'router-link')
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
