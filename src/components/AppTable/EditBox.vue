<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：EditBox.vue
  - 创建日期：2021/3/24 上午11:59
  - 创建作者：Jaxson
  -->

<template>
  <el-dialog v-model="dialogVisible" v-bind="config.dialog" title="编辑">
    <app-form v-model="editModel" :config="config.form" />
    <template v-if="config.footer" #footer>
      <div class="dialog-footer">
        <slot name="dialog-footer" :model="editModel" />
        <el-button v-if="config.footer.cancel" v-bind="config.footer.cancel.attrs" @click="dialogVisible = false">
          {{ config.footer.cancel.title }}
        </el-button>
        <el-button v-if="config.footer.confirm" v-bind="config.footer.confirm.attrs" @click="dialogVisible = false">
          {{ config.footer.confirm.title }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { ElDialog } from 'element-plus'

import AppForm from '@/components/AppForm'

export default defineComponent({
  name: 'EditBox',
  components: {
    ElDialog,
    AppForm
  },
  props: {
    visible: {
      require: true,
      type: Boolean,
      default: false
    },
    config: {
      require: true,
      type: [Object, Function],
      default: () => {}
    },
    model: {
      require: false,
      type: [Object, Function],
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(props.visible)
    const editModel = reactive(props.model)

    watch(dialogVisible, value => {
      emit('close', value)
    })

    return {
      dialogVisible,
      editModel
    }
  }
})
</script>

<style lang="scss" scoped></style>
