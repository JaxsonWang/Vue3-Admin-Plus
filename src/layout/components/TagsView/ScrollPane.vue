<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：ScrollPane.vue
  - 创建日期：2021/1/24 下午12:40
  - 创建作者：Jaxson
  -->

<template>
  <el-scrollbar :ref="scrollContainer" :vertical="false" class="scroll-container" view-class="scroll-container-view" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'

const tagAndTagSpacing = 4 // tagAndTagSpacing

export default defineComponent({
  name: 'ScrollPane',
  setup(props, { emit }) {
    const scrollContainer = computed(() => ref(null))
    const scrollWrapper = ref(null)
    const emitScroll = () => emit('scroll')
    const handleScroll = event => {
      const eventDelta = event.wheelDelta || -event.deltaY * 40
      const $scrollWrapper = scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }
    const moveToTarget = currentTag => {
      const $container = scrollContainer.value.value.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = scrollWrapper
      const tagList = scrollContainer.value.value.$parent.$parent.tagArrNodes

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }

    onMounted(() => {
      scrollWrapper.value = scrollContainer.value.value.$refs.wrap
      scrollWrapper.value.addEventListener('scroll', emitScroll, true)
    })
    onBeforeUnmount(() => {
      scrollWrapper.value.removeEventListener('scroll', emitScroll, true)
    })

    return {
      scrollContainer,
      handleScroll,
      moveToTarget
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep(.el-scrollbar__bar) {
    bottom: 0;
  }
  ::v-deep(.scroll-container-view) {
    line-height: 40px;
  }
}
</style>
