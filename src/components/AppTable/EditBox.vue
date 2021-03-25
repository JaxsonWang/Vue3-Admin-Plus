<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：EditBox.vue
  - 创建日期：2021/3/24 上午11:59
  - 创建作者：Jaxson
  -->

<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑"
    width="960px"
  >
    <app-form :config="config" :model="editModel" />
    <template v-if="footer" #footer>
      <div class="dialog-footer">
        <el-button
          v-if="footer.cancel"
          v-bind="footer.cancel.attrs"
          @click="dialogVisible = false">
          {{ footer.cancel.title }}
        </el-button>
        <el-button
          v-if="footer.confirm"
          v-bind="footer.confirm.attrs"
          @click="dialogVisible = false"
        >
          {{ footer.confirm.title }}
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
    },
    footer: {
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

<style lang="scss" scoped>

</style>
