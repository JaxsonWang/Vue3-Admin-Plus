<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppForm.vue
  - 创建日期：2021/3/31 下午2:34
  - 创建作者：Jaxson
  -->

<template>
  <el-form
    v-bind="appConfig.formAttrs"
    :model="appModel"
    ref="formRef"
    class="app-form-container"
  >
    <el-form-item
      v-for="(item, index) in appConfig.formList"
      v-bind="item.labelAttrs"
      :key="index"
      :prop="item.key"
    >
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="appModel[item.key]"
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
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
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
        v-model="appModel[item.key]"
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
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-input-number
        v-else-if="item.type === 'inputNumber'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-select
        v-else-if="item.type === 'select'"
        v-model="appModel[item.key]"
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
        v-model="appModel[item.key]"
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
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.default" #default="{ node, data }">
          <slot :name="item.formSlot.default" :node="node" :data="data" />
        </template>
      </el-cascader-panel>
      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-slider
        v-else-if="item.type === 'slider'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-time-picker
        v-else-if="item.type === 'timePicker'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
      />
      <el-time-select
        v-else-if="item.type === 'timeSelect'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-date-picker
        v-else-if="item.type === 'datePicker'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.rangeSeparator" #range-separator>
          <slot :name="item.formSlot.rangeSeparator" />
        </template>
      </el-date-picker>
      <el-upload
        v-else-if="item.type === 'upload'"
        v-model="appModel[item.key]"
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
      <el-rate
        v-else-if="item.type === 'rate'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-color-picker
        v-else-if="item.type === 'colorPicker'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      />
      <el-transfer
        v-else-if="item.type === 'transfer'"
        v-model="appModel[item.key]"
        v-bind="item.formAttrs"
        v-on="item.formEvents"
      >
        <template v-if="item.formSlot && item.formSlot.default" #default="{ option }">
          <slot :name="item.formSlot.default" :option="option" />
        </template>
      </el-transfer>
      <template
        v-else-if="item.type === 'submit'"
      >
        <el-button
          v-if="item.submit"
          v-bind="item.submit.attrs"
          v-on="item.submit.events"
          @click="formSubmit"
        >
          {{ item.submit.title }}
        </el-button>
        <el-button
          v-if="item.reset"
          v-bind="item.reset.attrs"
          v-on="item.reset.events"
          @click="formReset"
        >
          {{ item.reset.title }}
        </el-button>
      </template>
      <slot
        v-else-if="item.type === 'slot'"
        :name="item.name"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { merge } from 'lodash'

export default defineComponent({
  name: 'AppForm',
  props: {
    modelValue: {
      require: true,
      type: [Object, Function],
      default: () => {}
    },
    config: {
      require: true,
      type: [Object, Function],
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const formRef = ref(null)
    const appConfig = merge({}, props.config)
    const appModel = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })
    /**
     * 表单提交
     */
    const formSubmit = () => emit('submit', props.modelValue)
    /**
     * 清除表单
     */
    const formReset = () => {
      formRef.value.resetFields()
      emit('reset', props.modelValue)
    }

    // 初始化表单数据
    appConfig.formList = appConfig.formList.map(item => {
      if (!item.formEvents) item.formEvents = {}
      if (item.type === 'submit') {
        if (item.submit && !item.submit.attrs) item.submit.attrs = {}
        if (item.submit && !item.submit.events) item.submit.events = {}
        if (item.reset && !item.reset.attrs) item.reset.attrs = {}
        if (item.reset && !item.reset.events) item.reset.events = {}
      }
      return item
    })

    return {
      formRef,
      appConfig,
      appModel,
      formSubmit,
      formReset
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
