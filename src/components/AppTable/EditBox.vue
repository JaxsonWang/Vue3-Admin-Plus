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
    ref="editBoxRef"
    title="编辑"
    width="960px"
  >
    <span>这是一段信息</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElDialog } from 'element-plus'

export default defineComponent({
  name: 'EditBox',
  components: {
    ElDialog
  },
  props: {
    config: {
      require: true,
      type: [Object, Function],
      default: () => {}
    }
  },
  setup() {
    const editBoxRef = ref(null)
    const dialogVisible = ref(false)

    const toggleVisible = () => {
      dialogVisible.value = !dialogVisible.value
    }

    return {
      editBoxRef,
      dialogVisible,
      toggleVisible
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
