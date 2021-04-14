<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：Link.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
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
    const linkProps = (to: any) => {
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
