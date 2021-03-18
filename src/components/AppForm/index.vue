<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppForm.vue
  - 创建日期：2021/3/9 下午9:56
  - 创建作者：jaxson
  -->

<template>
  <el-form
    v-bind="appConfig.formAttrs"
    :model="appForm"
    ref="formRef"
    class="app-form-container"
  >
    <el-form-item
      v-for="(item, index) in appConfig.formList"
      v-bind="item.labelAttrs"
      :key="index"
    >
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.isButton">
          <el-radio-button
            v-for="(rdo, rid) in item.options"
            v-bind="rdo.attrs"
            v-on="rdo.events"
            :key="rid"
          >
            {{ rdo.title }}
          </el-radio-button>
        </template>
        <template v-else>
          <el-radio
            v-for="(rdo, rid) in item.options"
            v-bind="rdo.attrs"
            v-on="rdo.events"
            :key="rid"
          >
            {{ rdo.title }}
          </el-radio>
        </template>
      </el-radio-group>
      <el-checkbox-group
        v-else-if="item.type === 'checkbox'"
        v-model="appForm[item.key]"
      >
        <template v-if="item.isButton">
          <el-checkbox-button
            v-for="(cbx, cid) in item.options"
            v-bind="cbx.attrs"
            v-on="cbx.events"
            :key="cid"
          >
            {{ cbx.title }}
          </el-checkbox-button>
        </template>
        <template v-else>
          <el-checkbox
            v-for="(cbx, cid) in item.options"
            v-bind="cbx.attrs"
            v-on="cbx.events"
            :key="cid"
          >
            {{ cbx.title }}
          </el-checkbox>
        </template>
      </el-checkbox-group>
      <el-input
        v-else-if="item.type === 'input'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.prefix" #prefix>
          <slot :name="item.formSlot.prefix" />
        </template>
        <template v-if="item.formSlot && item.formSlot.suffix" #suffix>
          <slot :name="item.formSlot.suffix" />
        </template>
        <template v-if="item.formSlot && item.formSlot.prepend" #prepend>
          <slot :name="item.formSlot.prepend" />
        </template>
        <template v-if="item.formSlot && item.formSlot.append" #append>
          <slot :name="item.formSlot.append" />
        </template>
      </el-input>
      <el-autocomplete
        v-else-if="item.type === 'autocomplete'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-input-number
        v-else-if="item.type === 'input-number'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-select
        v-else-if="item.type === 'select'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
      >
        <template v-if="item.formSlot && item.formSlot.default">
          <slot :name="item.formSlot.default" />
        </template>
        <template v-else>
          <template v-if="item.isGroup">
            <el-option-group
              v-for="(group, gid) in item.options"
              :key="gid"
              :label="group.label"
              :disabled="group.disabled"
            >
              <el-option
                v-for="(slt, sid) in group.options"
                v-bind="slt"
                :key="sid"
              />
            </el-option-group>
          </template>
          <template v-else>
            <el-option
              v-for="(slt, sid) in item.options"
              v-bind="slt"
              :key="sid"
            />
          </template>
        </template>
        <template v-if="item.formSlot && item.formSlot.prefix" #prefix>
          <slot :name="item.formSlot.prefix" />
        </template>
        <template v-if="item.formSlot && item.formSlot.empty" #empty>
          <slot :name="item.formSlot.empty" />
        </template>
      </el-select>
      <el-cascader
        v-else-if="item.type === 'cascader'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.default" #default="{ node, data }">
          <slot :name="item.formSlot.default" :node="node" :data="data" />
        </template>
        <template v-if="item.formSlot && item.formSlot.empty" #empty>
          <slot :name="item.formSlot.empty" />
        </template>
      </el-cascader>
      <el-cascader-panel
        v-else-if="item.type === 'cascaderPanel'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.default" #default="{ node, data }">
          <slot :name="item.formSlot.default" :node="node" :data="data" />
        </template>
      </el-cascader-panel>
      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-slider
        v-else-if="item.type === 'slider'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-time-picker
        v-else-if="item.type === 'timePicker'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
      />
      <el-time-select
        v-else-if="item.type === 'timeSelect'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-date-picker
        v-else-if="item.type === 'datePicker'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.rangeSeparator" #range-separator>
          <slot :name="item.formSlot.rangeSeparator" />
        </template>
      </el-date-picker>
      <el-rate
        v-else-if="item.type === 'rate'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-color-picker
        v-else-if="item.type === 'colorPicker'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-transfer
        v-else-if="item.type === 'transfer'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.default" #default="{ option }">
          <slot :name="item.formSlot.default" :option="option" />
        </template>
      </el-transfer>
      <el-upload
        v-else-if="item.type === 'upload'"
        v-model="appForm[item.key]"
        v-bind="item.formAttrs"
      >
        <template v-if="item.formSlot && item.formSlot.default">
          <slot :name="item.formSlot.default" />
        </template>
        <template v-else>
          <el-button size="small" type="primary">点击上传</el-button>
        </template>
        <template v-if="item.formSlot && item.formSlot.tip" #tip>
          <slot :name="item.formSlot.tip" />
        </template>
        <template v-if="item.formSlot && item.formSlot.trigger" #trigger>
          <slot :name="item.formSlot.trigger" />
        </template>
      </el-upload>
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

    // 初始化表单数据
    appConfig.formList = appConfig.formList.map(item => {
      if (!item.formEvents) item.formEvents = {}
      return item
    })
    // 初始化表单 model
    appConfig.formList.forEach(item => appForm[item.key] = item.value)

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
