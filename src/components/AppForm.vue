<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppForm.vue
  - 创建日期：2021/3/9 下午9:56
  - 创建作者：jaxson
  -->

<template>
  <el-form
    v-bind="appConfig.formAttr"
    :model="appForm"
    ref="formRef"
    class="app-form-container"
  >
    <el-form-item
      v-for="(item, index) in appConfig.formList"
      v-bind="item.labelAttr"
      :key="index"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="appForm[item.key]"
        v-bind="item.formAttr"
      />
      <el-radio-group
        v-else-if="item.type === 'radio'"
        v-model="appForm[item.key]"
      >
        <el-radio
          v-for="(rdo, rid) in item.options"
          v-bind="rdo.attr"
          :key="rid"
        >
          {{ rdo.title }}
        </el-radio>
      </el-radio-group>
      <el-checkbox-group
        v-else-if="item.type === 'checkbox'"
        v-model="appForm[item.key]"
      >
        <el-checkbox
          v-for="(cbx, cid) in item.options"
          v-bind="cbx.attr"
          :key="cid"
        >
          {{ cbx.title }}
        </el-checkbox>
      </el-checkbox-group>
      <el-input-number
        v-else-if="item.type === 'input-number'"
        v-model="appForm[item.key]"
        v-bind="item.formAttr"
      />
      <el-select
        v-else-if="item.type === 'select'"
        v-model="appForm[item.key]"
        v-bind="item.formAttr"
      >
        <el-option
          v-for="slt in item.options"
          v-bind="slt"
          :key="slt.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { merge } from 'lodash'

export default defineComponent({
  name: 'AppForm',
  props: {
    config: {
      require: true,
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const appConfig = merge({}, props.config)
    const appForm = reactive({})

    const onSubmit = () => {
      console.log('submit!', appForm)
    }

    // 初始化表单 model
    appConfig.formList.forEach(item => appForm[item.key] = item.formAttr.value)

    return {
      appConfig,
      appForm,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
