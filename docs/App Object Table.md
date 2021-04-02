# App Object Form

`Object Table` 是一个封装好开箱即用的组件，该组件可以填写相关的配置代码即可渲染出强大地列表展示页。

一般来说表格大体部分如下述图片展示，分成三大块：表头，正文和分页，而表头又可以分为搜索栏和批量操作栏，正文展示表格内容，每行表格后面有编辑和删除基础操作功能,新建和编辑使用[对象表单](./App%20Object%20Form.md)组成，展示方式当前页面弹窗显示或者跳转到新的页面。当然你有特殊的需求无法满足，可以进行二次扩展或者部分区域重写。

![](https://github.com/JaxsonWang/Vue3-Admin-Plus/raw/master/docs/images/image-1.png)

## 使用

```html
<app-table :config="tableConfig" />
```

引入组件声明声明对应属性：

| 参数    | 说明       | 类型   | 默认值 | 是否必填 |
| :------ | :--------- | ------ | ------ | -------- |
| config  | 列表页面表示层 | Object | {}     | 是       |

### config

`config` 是展示页面的具体表示，里面包含不同区域数据组合展示的效果，下面一一讲述使用方式：

| 参数      | 说明                             | 类型   | 默认值 | 是否必填 |
| :-------- | :------------------------------- | ------ | ------ | -------- |
| header    | 页表操作栏，包括搜索和批量操作 | Object | {}     | 否       |
| table     | 表格列表                   | Object  | {}     | 是       |
| pagination| 表格分页                   | Object  | {}     | 否       |
| editBox   | 行内编辑弹窗                | Object  | {}     | 否       |

> 上述部分字段组件默认添加一些必需属性

#### header 表头

表头区域主要是左右俩块区域，左边是针对正文列表进行搜索，例如对列表某个字段关键词搜索得出列表信息，这边展示内容数据格式就是标准的对象表单。而右侧是对列表进行批量操作，例如批量删除、批量审核等相关操作动作，默认内置新建和批量删除的俩个动作操作。

| 参数      | 说明                             | 类型   | 默认值 | 是否必填 |
| :-------- | :------------------------------- | ------ | ------ | -------- |
| search    | 搜索栏表单 | Object | {}     | 否       |
| actions   | 批量操作栏 | Object  | []     | 是       |

##### search

表格列表数据搜索，等价于 [Object Form 中的 config](https://github.com/JaxsonWang/Vue3-Admin-Plus/blob/master/docs/App%20Object%20Form.md#config) 属性。

##### actions

操作栏数据类型是数组对象，里面包含不同按钮元素。默认内置表格列表批量操作和新建一条数据。如果你有其他操作需求，可以自定义插槽。

- `action` 按钮操作类型，目前内置俩个选项可选：`delete` 和 `add`，即批量删除和新建资源。
- `title` 按钮显示名称
- `attrs` 按钮属性，等同于 [Button Attributes](https://element-plus.org/#/zh-CN/component/button#attributes)
- `api` 接口地址，目前只有 `delete` 动作需要用到此属性
- `type` 新增资源展示类型，属性如下：
  - `editBox` 行内弹窗展示，即在当前页以弹窗形式展示表单，弹窗内内容数据配置在下面详述
  - `editRoute` 跳转到独立编辑页，适合用于表单内容很多且复杂的情况
  

**slot 自定义插槽**

- `header-action-before` 在 `actions` 按钮`左侧`自定义展示内容，参数如下：
  - `loading` 布尔值
- `header-action-after` 在 `actions` 按钮`右侧`自定义展示内容
  - `loading` 布尔值
  
#### table

表格列表正文展示。

| 参数      | 说明                             | 类型   | 默认值 | 是否必填 |
| :-------- | :------------------------------- | ------ | ------ | -------- |
| attrs    | 表格属性 | Object | {}     | 否       |
| events    | 表格事件 | Object | {}     | 否       |
| columns   | 表格个列具体展示 | Object  | []     | 是       |
| api   | 操作栏接口 | Object  | {}     | 是       |

##### attrs

等价于 [Table Attributes](https://element-plus.org/#/zh-CN/component/table#table-attributes) 属性列表，下列展示不支持的属性：

- `data` 表格列表数据源

##### events

等价于 [Table Events](https://element-plus.org/#/zh-CN/component/table#table-events) 事件列表，下列展示不支持的事件：

- `selection-change` 已经对此进行二次封装

##### columns

表格个列具体表示，