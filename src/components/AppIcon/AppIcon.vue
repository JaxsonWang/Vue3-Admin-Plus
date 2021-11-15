<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon external-icon svg-icon" v-bind="$attrs" />
  <svg v-else-if="isCustomSvg" :class="['svg-icon']" :style="styleCustomSvg" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
  <component v-else-if="isEleIcon" :is="pipeEleIcon()" :class="['svg-icon', 'el-icon', icon]" :style="styleCustomSvg" aria-hidden="true" v-bind="$attrs" />
  <i v-else :class="['remix-icon', icon]" :style="styleFontIcon" aria-hidden="true" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isExternal as isExternalRegExp, isEleIcon as isEleIconRegExp } from '@/utils/validate'

const props = defineProps({
  icon: {
    required: true,
    type: String
  },
  size: {
    required: false,
    type: [String, Number],
    default: ''
  },
  isCustomSvg: {
    required: false,
    type: Boolean,
    default: false
  }
})
const isExternal = computed(() => isExternalRegExp(props.icon))
const isEleIcon = computed(() => isEleIconRegExp(props.icon))
const iconName = computed(() => `#icon-${props.icon}`)
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
    width: props.size,
    height: props.size
  }
})
const styleCustomSvg = computed(() => {
  return {
    width: props.size,
    height: props.size
  }
})
const styleFontIcon = computed(() => {
  return {
    fontSize: props.size
  }
})
/**
 * 根据传入 icon 名称识别为 el-icon 组件
 */
const pipeEleIcon = (): string => {
  return props.icon.slice(3)
}
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  position: relative;
  bottom: 1px;
  overflow: hidden;
  vertical-align: middle;
  fill: currentColor;
}

.external-icon,
.svg-icon {
  width: 14px;
  height: 14px;
}

.remix-icon {
  font-size: 14px;
  vertical-align: middle;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover;
}
</style>
