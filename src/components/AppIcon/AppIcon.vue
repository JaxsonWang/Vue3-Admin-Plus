<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else-if="isCustomSvg" :class="['svg-icon']" :style="styleCustomSvg" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
  <i v-else-if="isEleIcon" :class="['el-font-icon', icon]" :style="styleFontIcon" aria-hidden="true" v-bind="$attrs" />
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
  if (props.size === '') return {}
  return {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size
  }
})
const styleCustomSvg = computed(() => {
  if (props.size === '') return {}
  return {
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size
  }
})
const styleFontIcon = computed(() => {
  if (props.size === '') return {}
  return {
    fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  margin: 0 auto;
  width: 14px;
  height: 14px;
  overflow: hidden;
  vertical-align: inherit;
  fill: currentColor;
}

.el-font-icon,
.remix-icon {
  font-size: 14px;
}

.svg-external-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: currentColor;
  mask-size: cover;
}
</style>
