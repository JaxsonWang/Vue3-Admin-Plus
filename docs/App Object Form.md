# App Object Form

`Object Form` 是对 `el-form` 表单组件再次进行封装的组件，只需要简单的数据即可展示强大的表单页面。

## 使用

```html
<app-form v-model="formModel" :config="formConfig" />
```

引入组件声明声明对应属性：

| 参数    | 说明       | 类型   | 默认值 | 是否必填 |
| :------ | :--------- | ------ | ------ | -------- |
| v-model | 表单数据层 | Object | {}     | 是       |
| config  | 表单表示层 | Object | {}     | 是       |

### v-model

表示表单数据对象，等价于 [Form Attributes 文档](https://element-plus.org/#/zh-CN/component/form#form-attributes) 中的 `model`，用于最终保存数据到数据库。如果需要覆盖表单数据请使用该属性进行操作。

> 对于 `对象` 类型的表单请填写默认值，否则加载表单失败！

### config

`config` 是展示表单的具体表示，里面包含常用的表单，下面一一讲述使用方式：

| 参数      | 说明                             | 类型   | 默认值 | 是否必填 |
| :-------- | :------------------------------- | ------ | ------ | -------- |
| formAttrs | `el-form` 属性，具体细节下面描述 | Object | {}     | 是       |
| formList  | 表单列表细节展示                 | Array  | []     | 是       |

- `formAttrs` 请参考 `Element Plus` 的 [Form Attributes 文档](https://element-plus.org/#/zh-CN/component/form#form-attributes)。
  - Form Attributes 中的 `model` 无效，请不要添加该属性。



#### formList

支持 `Element Plus` 所有表单类型，可以控制表单效果展示。表单元素数据结构大致如下：

```javascript
{
    "type": "formType",
    "key": "formKey",
    "value": "",
    "labelAttrs": {
        "label": "Label Name"
    },
    "formAttrs": {},
    "formEvents": {}
}
```

除了特殊的表单会多出额外的字段以外，大部分表单结构如上展示：

- `type` 表单类型，目前支持表单有：
  - `radio` 
  - `checkbox`
  - `input`
  - `autocomplete`
  - `inputNumber`
  - `select`
  - `cascader`
  - `cascaderPanel`
  - `switch`
  - `slider`
  - `timePicker`
  - `timeSelect`
  - `datePicker`
  - `rate`
  - `colorPicker`
  - `transfer`
  - `upload`
  - `submit` 提交按钮
  - `slot` 自定义插槽
- `key` 表单对象 `key` ，等同于组件的 `model` 的 `key` 键值，如果是表单类型组件该字段必须填写
- `value` 表单默认值，如果 `v-model` 缺失则从该字段作为默认值
- `labelAttrs` 等同于 [Form-Item Attributes](https://element-plus.org/#/zh-CN/component/form#form-item-attributes)
- `formAttrs` 等同于表单的属性，下列展示
- `formEvents` 等同于表单的事件，下列展示

支持表单类型具体如下：

##### `radio` 单选框

- `formAttrs` 等同于 [Radio-group Attributes](https://element-plus.org/#/zh-CN/component/radio#radio-group-attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Radio-group Events](https://element-plus.org/#/zh-CN/component/radio#radio-group-events)
- `options` `radio` 子元素表示
  - `title` `radio` 子元素名称
  - `attrs` `radio` 子元素属性，等同于 [Radio Attributes](https://element-plus.org/#/zh-CN/component/radio#radio-attributes)
  - `events` `radio` 子元素事件，等同于 [Radio Events](https://element-plus.org/#/zh-CN/component/radio#radio-events)
- `isButton` 是否按钮样式，数据类型为布尔值

##### checkbox 多选框

- `formAttrs` 等同于 [Checkbox-group Attributes](https://element-plus.org/#/zh-CN/component/checkbox#checkbox-group-attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Checkbox-group Events](https://element-plus.org/#/zh-CN/component/checkbox#checkbox-group-events)
- `options` `checkbox` 子元素表示
  - `title` `checkbox` 子元素名称
  - `attrs` `checkbox` 子元素属性，等同于 [Checkbox Attributes](https://element-plus.org/#/zh-CN/component/checkbox#checkbox-attributes)
  - `events` `checkbox` 子元素事件，等同于 [Checkbox Events](https://element-plus.org/#/zh-CN/component/checkbox#checkbox-events)
- `isButton` 是否按钮样式，数据类型为布尔值

##### input 输入框

- `formAttrs` 等同于 [Input Attributes](https://element-plus.org/#/zh-CN/component/input#input-attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Input Events](https://element-plus.org/#/zh-CN/component/input#input-events)
- `formSlot` 等同于 [Input Slots](https://element-plus.org/#/zh-CN/component/input#input-slots)
  - `name` 自定义插槽名称

##### autocomplete 建议输入框

- `formAttrs` 等同于 [Autocomplete Attributes](https://element-plus.org/#/zh-CN/component/input#autocomplete-attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Autocomplete Events](https://element-plus.org/#/zh-CN/component/input#autocomplete-events)
- `formSlot` 等同于 [Autocomplete Slots](https://element-plus.org/#/zh-CN/component/input#autocomplete-slots)
  - `name` 自定义插槽名称

##### inputNumber 计数器

- `formAttrs` 等同于 [InputNumber Attributes](https://element-plus.org/#/zh-CN/component/input-number#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [InputNumber Events](https://element-plus.org/#/zh-CN/component/input-number#events)

##### select 选择器

- `formAttrs` 等同于 [Select Attributes](https://element-plus.org/#/zh-CN/component/select#select-attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Select Events](https://element-plus.org/#/zh-CN/component/select#select-events)
- `formSlot` 等同于 [Select Slots](https://element-plus.org/#/zh-CN/component/select#select-slots)
  - `name` 自定义插槽名称，如果文档展示的 `slot name` 为空，这边 `key` 为：`default`
- `options` 下拉选框子元素 等同于 [Option Attributes](https://element-plus.org/#/zh-CN/component/select#option-attributes)
- `isGroup` 是否含有下拉框分组，数据类型为布尔值，开启多出分组属性：[Option Group Attributes](https://element-plus.org/#/zh-CN/component/select#option-group-attributes)

##### cascader 级联选择器

- `formAttrs` 等同于 [Cascader Attributes](https://element-plus.org/#/zh-CN/component/cascader#cascader-attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Cascader Events](https://element-plus.org/#/zh-CN/component/cascader#cascader-events)
- `formSlot` 等同于 [Cascader Slots](https://element-plus.org/#/zh-CN/component/cascader#cascader-slots)
  - `name` 自定义插槽名称，如果文档展示的 `slot name` 为空，这边 `key` 为：`default`

##### cascaderPanel 级联面板

- `formAttrs` 等同于 [CascaderPanel Attributes](https://element-plus.org/#/zh-CN/component/cascader#cascaderpanel-attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [CascaderPanel Events](https://element-plus.org/#/zh-CN/component/cascader#cascaderpanel-events)
- `formSlot` 等同于 [CascaderPanel Slots](https://element-plus.org/#/zh-CN/component/cascader#cascaderpanel-slots)
  - `name` 自定义插槽名称，如果文档展示的 `slot name` 为空，这边 `key` 为：`default`

##### switch 开关

- `formAttrs` 等同于 [Switch Attributes](https://element-plus.org/#/zh-CN/component/switch#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Switch Events](https://element-plus.org/#/zh-CN/component/switch#events)

##### slider 滑块

- `formAttrs` 等同于 [Slider Attributes](https://element-plus.org/#/zh-CN/component/slider#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Slider Events](https://element-plus.org/#/zh-CN/component/slider#events)

##### timePicker 时间选择器

- `formAttrs` 等同于 [TimePicker Attributes](https://element-plus.org/#/zh-CN/component/time-picker#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [TimePicker Events](https://element-plus.org/#/zh-CN/component/time-picker#events)

##### timeSelect 时间选择器

- `formAttrs` 等同于 [TimeSelect Attributes](https://element-plus.org/#/zh-CN/component/time-select#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [TimeSelect Events](https://element-plus.org/#/zh-CN/component/time-select#events)

##### datePicker 日期选择器

- `formAttrs` 等同于 [DatePicker Attributes](https://element-plus.org/#/zh-CN/component/date-picker#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [DatePicker Events](https://element-plus.org/#/zh-CN/component/date-picker#events)
- `formSlot` 等同于 [CascaderPanel Slots](https://element-plus.org/#/zh-CN/component/datetime-picker#slots)
  - `name` 自定义插槽名称，如果文档展示的 `slot name` 为空，这边 `key` 为：`default`

##### rate 评分

- `formAttrs` 等同于 [Rate Attributes](https://element-plus.org/#/zh-CN/component/rate#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Rate Events](https://element-plus.org/#/zh-CN/component/rate#events)

##### colorPicker 颜色选择器

- `formAttrs` 等同于 [ColorPicker Attributes](https://element-plus.org/#/zh-CN/component/color-picker#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [ColorPicker Events](https://element-plus.org/#/zh-CN/component/color-picker#events)

##### transfer 穿梭框

- `formAttrs` 等同于 [Transfer Attributes](https://element-plus.org/#/zh-CN/component/transfer#attributes)
  - 不支持 `v-model`
- `formEvents` 等同于 [Transfer Events](https://element-plus.org/#/zh-CN/component/transfer#events)
- `formSlot` 等同于 [Transfer Slots](https://element-plus.org/#/zh-CN/component/transfer#slot)
  - `name` 自定义插槽名称，如果文档展示的 `slot name` 为空，这边 `key` 为：`default`

##### upload 上传

- `formAttrs` 等同于 [Upload Attributes](https://element-plus.org/#/zh-CN/component/upload#attribute)
  - 不支持 `v-model`
- `formSlot` 等同于 [Upload Slots](https://element-plus.org/#/zh-CN/component/upload#slot)
  - `name` 自定义插槽名称，如果文档展示的 `slot name` 为空，这边 `key` 为：`default`

##### submit 提交按钮

- `submit` 提交按钮
  - `title` 按钮名称
  - `attrs` 按钮属性 等同于 [Button Attributes](https://element-plus.org/#/zh-CN/component/button#attributes)
- `reset` 重置按钮，如果不填写该字段，则会隐藏该字段属性
  - `title` 按钮名称
  - `attrs` 按钮属性 等同于 [Button Attributes](https://element-plus.org/#/zh-CN/component/button#attributes)

##### slot 自定义插槽

- `name` 插槽名称

### 事件

- `@submit` 如果使用 `submit` 属性，则会出现这个事件，返回的参数为表单的 `model` 对象。

