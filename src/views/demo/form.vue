<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：form.vue
  - 创建日期：2021/3/9 下午10:02
  - 创建作者：jaxson
  -->

<template>
  <div class="app-form-container">
    <app-form :config="formConfig" :model="formModel" ref="appFormRef" />
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import AppForm from '@/components/AppForm'

export default defineComponent({
  name: 'FormDemo',
  components: {
    AppForm
  },
  setup() {
    const appFormRef = ref()
    const formConfig = reactive({
      formAttrs: {
        inline: false,
        labelPosition: 'top',
        labelWidth: 'auto',
        size: 'small'
      },
      formList: [
        {
          type: 'radio',
          key: 'radio',
          value: 1,
          labelAttrs: {
            label: '单选集合'
          },
          formAttrs: {},
          formEvents: {},
          options: [
            {
              title: '选项1',
              attrs: {
                label: 0
              },
              events: {}
            },
            {
              title: '选项2',
              attrs: {
                label: 1
              },
              events: {}
            },
            {
              title: '选项3',
              attrs: {
                label: 2
              },
              events: {}
            }
          ]
        },
        {
          type: 'checkbox',
          key: 'checkbox',
          value: [0, 1],
          labelAttrs: {
            label: '多选集合'
          },
          formAttrs: {
          },
          formEvents: {},
          options: [
            {
              title: '选项1',
              attrs: {
                label: 0
              },
              events: {}
            },
            {
              title: '选项2',
              attrs: {
                label: 1
              },
              events: {}
            },
            {
              title: '选项3',
              attrs: {
                label: 2
              },
              events: {}
            }
          ]
        },
        {
          type: 'input',
          key: 'username',
          value: 'Jaxson',
          labelAttrs: {
            label: '用户名'
          },
          formAttrs: {
            type: 'text',
            placeholder: '请输入用户名',
            clearable: true
          },
          formEvents: {}
        },
        {
          type: 'input-number',
          key: 'inputNumber',
          value: 1,
          labelAttrs: {
            label: '计数器'
          },
          formAttrs: {
            min: 1,
            max: 10,
            label: '描述说明'
          },
          formEvents: {}
        },
        {
          type: 'select',
          key: 'select',
          value: 0,
          labelAttrs: {
            label: '选择器'
          },
          formAttrs: {
            placeholder: '请选择选项'
          },
          formEvents: {},
          options: [
            {
              label: '选项1',
              value: 0
            },
            {
              label: '选项2',
              value: 1
            },
            {
              label: '选项3',
              value: 2
            }
          ]
        },
        {
          type: 'select',
          key: 'selectGroup',
          value: 'Shanghai',
          labelAttrs: {
            label: '选择器'
          },
          formAttrs: {
            placeholder: '请选择选项'
          },
          formEvents: {},
          options: [
            {
              label: '热门城市',
              options: [
                {
                  value: 'Shanghai',
                  label: '上海'
                },
                {
                  value: 'Beijing',
                  label: '北京'
                }
              ]
            },
            {
              label: '城市名',
              options: [
                {
                  value: 'Chengdu',
                  label: '成都'
                },
                {
                  value: 'Shenzhen',
                  label: '深圳'
                },
                {
                  value: 'Guangzhou',
                  label: '广州'
                },
                {
                  value: 'Dalian',
                  label: '大连'
                }
              ]
            }
          ],
          isGroup: true
        },
        {
          type: 'cascader',
          key: 'cascader',
          value: [],
          labelAttrs: {
            label: '联级选择器'
          },
          formAttrs: {
            placeholder: '请选择选项',
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                      {
                        value: 'yizhi',
                        label: '一致'
                      },
                      {
                        value: 'fankui',
                        label: '反馈'
                      },
                      {
                        value: 'xiaolv',
                        label: '效率'
                      },
                      {
                        value: 'kekong',
                        label: '可控'
                      }
                    ]
                  },
                  {
                    value: 'daohang',
                    label: '导航',
                    children: [
                      {
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                      },
                      {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'zujian',
                label: '组件',
                children: [
                  {
                    value: 'basic',
                    label: 'Basic',
                    children: [
                      {
                        value: 'layout',
                        label: 'Layout 布局'
                      },
                      {
                        value: 'color',
                        label: 'Color 色彩'
                      },
                      {
                        value: 'typography',
                        label: 'Typography 字体'
                      },
                      {
                        value: 'icon',
                        label: 'Icon 图标'
                      },
                      {
                        value: 'button',
                        label: 'Button 按钮'
                      }
                    ]
                  },
                  {
                    value: 'form',
                    label: 'Form',
                    children: [
                      {
                        value: 'radio',
                        label: 'Radio 单选框'
                      },
                      {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                      },
                      {
                        value: 'input',
                        label: 'Input 输入框'
                      },
                      {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                      },
                      {
                        value: 'select',
                        label: 'Select 选择器'
                      },
                      {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                      },
                      {
                        value: 'switch',
                        label: 'Switch 开关'
                      },
                      {
                        value: 'slider',
                        label: 'Slider 滑块'
                      },
                      {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                      },
                      {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                      },
                      {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                      },
                      {
                        value: 'upload',
                        label: 'Upload 上传'
                      },
                      {
                        value: 'rate',
                        label: 'Rate 评分'
                      },
                      {
                        value: 'form',
                        label: 'Form 表单'
                      }
                    ]
                  },
                  {
                    value: 'data',
                    label: 'Data',
                    children: [
                      {
                        value: 'table',
                        label: 'Table 表格'
                      },
                      {
                        value: 'tag',
                        label: 'Tag 标签'
                      },
                      {
                        value: 'progress',
                        label: 'Progress 进度条'
                      },
                      {
                        value: 'tree',
                        label: 'Tree 树形控件'
                      },
                      {
                        value: 'pagination',
                        label: 'Pagination 分页'
                      },
                      {
                        value: 'badge',
                        label: 'Badge 标记'
                      }
                    ]
                  },
                  {
                    value: 'notice',
                    label: 'Notice',
                    children: [
                      {
                        value: 'alert',
                        label: 'Alert 警告'
                      },
                      {
                        value: 'loading',
                        label: 'Loading 加载'
                      },
                      {
                        value: 'message',
                        label: 'Message 消息提示'
                      },
                      {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                      },
                      {
                        value: 'notification',
                        label: 'Notification 通知'
                      }
                    ]
                  },
                  {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [
                      {
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                      },
                      {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                      },
                      {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                      },
                      {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                      },
                      {
                        value: 'steps',
                        label: 'Steps 步骤条'
                      }
                    ]
                  },
                  {
                    value: 'others',
                    label: 'Others',
                    children: [
                      {
                        value: 'dialog',
                        label: 'Dialog 对话框'
                      },
                      {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                      },
                      {
                        value: 'popover',
                        label: 'Popover 弹出框'
                      },
                      {
                        value: 'card',
                        label: 'Card 卡片'
                      },
                      {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                      },
                      {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'ziyuan',
                label: '资源',
                children: [
                  {
                    value: 'axure',
                    label: 'Axure Components'
                  },
                  {
                    value: 'sketch',
                    label: 'Sketch Templates'
                  },
                  {
                    value: 'jiaohu',
                    label: '组件交互文档'
                  }
                ]
              }
            ]
          },
          formEvents: {}
        },
        {
          type: 'cascaderPanel',
          key: 'cascaderPanel',
          value: [],
          labelAttrs: {
            label: '联级选择器'
          },
          formAttrs: {
            placeholder: '请选择选项',
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                      {
                        value: 'yizhi',
                        label: '一致'
                      },
                      {
                        value: 'fankui',
                        label: '反馈'
                      },
                      {
                        value: 'xiaolv',
                        label: '效率'
                      },
                      {
                        value: 'kekong',
                        label: '可控'
                      }
                    ]
                  },
                  {
                    value: 'daohang',
                    label: '导航',
                    children: [
                      {
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                      },
                      {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'zujian',
                label: '组件',
                children: [
                  {
                    value: 'basic',
                    label: 'Basic',
                    children: [
                      {
                        value: 'layout',
                        label: 'Layout 布局'
                      },
                      {
                        value: 'color',
                        label: 'Color 色彩'
                      },
                      {
                        value: 'typography',
                        label: 'Typography 字体'
                      },
                      {
                        value: 'icon',
                        label: 'Icon 图标'
                      },
                      {
                        value: 'button',
                        label: 'Button 按钮'
                      }
                    ]
                  },
                  {
                    value: 'form',
                    label: 'Form',
                    children: [
                      {
                        value: 'radio',
                        label: 'Radio 单选框'
                      },
                      {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                      },
                      {
                        value: 'input',
                        label: 'Input 输入框'
                      },
                      {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                      },
                      {
                        value: 'select',
                        label: 'Select 选择器'
                      },
                      {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                      },
                      {
                        value: 'switch',
                        label: 'Switch 开关'
                      },
                      {
                        value: 'slider',
                        label: 'Slider 滑块'
                      },
                      {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                      },
                      {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                      },
                      {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                      },
                      {
                        value: 'upload',
                        label: 'Upload 上传'
                      },
                      {
                        value: 'rate',
                        label: 'Rate 评分'
                      },
                      {
                        value: 'form',
                        label: 'Form 表单'
                      }
                    ]
                  },
                  {
                    value: 'data',
                    label: 'Data',
                    children: [
                      {
                        value: 'table',
                        label: 'Table 表格'
                      },
                      {
                        value: 'tag',
                        label: 'Tag 标签'
                      },
                      {
                        value: 'progress',
                        label: 'Progress 进度条'
                      },
                      {
                        value: 'tree',
                        label: 'Tree 树形控件'
                      },
                      {
                        value: 'pagination',
                        label: 'Pagination 分页'
                      },
                      {
                        value: 'badge',
                        label: 'Badge 标记'
                      }
                    ]
                  },
                  {
                    value: 'notice',
                    label: 'Notice',
                    children: [
                      {
                        value: 'alert',
                        label: 'Alert 警告'
                      },
                      {
                        value: 'loading',
                        label: 'Loading 加载'
                      },
                      {
                        value: 'message',
                        label: 'Message 消息提示'
                      },
                      {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                      },
                      {
                        value: 'notification',
                        label: 'Notification 通知'
                      }
                    ]
                  },
                  {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [
                      {
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                      },
                      {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                      },
                      {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                      },
                      {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                      },
                      {
                        value: 'steps',
                        label: 'Steps 步骤条'
                      }
                    ]
                  },
                  {
                    value: 'others',
                    label: 'Others',
                    children: [
                      {
                        value: 'dialog',
                        label: 'Dialog 对话框'
                      },
                      {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                      },
                      {
                        value: 'popover',
                        label: 'Popover 弹出框'
                      },
                      {
                        value: 'card',
                        label: 'Card 卡片'
                      },
                      {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                      },
                      {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'ziyuan',
                label: '资源',
                children: [
                  {
                    value: 'axure',
                    label: 'Axure Components'
                  },
                  {
                    value: 'sketch',
                    label: 'Sketch Templates'
                  },
                  {
                    value: 'jiaohu',
                    label: '组件交互文档'
                  }
                ]
              }
            ]
          },
          formEvents: {}
        },
        {
          type: 'switch',
          key: 'switch',
          value: false,
          labelAttrs: {
            label: '开关'
          },
          formAttrs: {
          },
          formEvents: {}
        },
        {
          type: 'slider',
          key: 'slider',
          value: [30, 60],
          labelAttrs: {
            label: '滑块'
          },
          formAttrs: {
            marks: {
              0: '0°C',
              8: '8°C',
              37: '37°C',
              50: {
                style: {
                  color: '#1989FA'
                },
                label: '50%'
              }
            }
          },
          formEvents: {}
        },
        {
          type: 'timePicker',
          key: 'timePicker',
          value: new Date(),
          labelAttrs: {
            label: '时间选择器1'
          },
          formAttrs: {
          },
          formEvents: {}
        },
        {
          type: 'timeSelect',
          key: 'timeSelect',
          value: '08:30',
          labelAttrs: {
            label: '时间选择器2'
          },
          formAttrs: {
            start: '08:30',
            step: '00:15',
            end: '18:30',
            placeholder: '选择时间'
          },
          formEvents: {}
        },
        {
          type: 'datePicker',
          key: 'datePicker1',
          value: '',
          labelAttrs: {
            label: '日期选择器1'
          },
          formAttrs: {
            type: 'date',
            placeholder: '选择日期'
          },
          formEvents: {}
        },
        {
          type: 'datePicker',
          key: 'datePicker2',
          value: '',
          labelAttrs: {
            label: '日期选择器2'
          },
          formAttrs: {
            type: 'datetime',
            placeholder: '选择日期'
          },
          formEvents: {}
        },
        {
          type: 'rate',
          key: 'rate',
          value: null,
          labelAttrs: {
            label: '评分'
          },
          formAttrs: {
          },
          formEvents: {}
        },
        {
          type: 'colorPicker',
          key: 'colorPicker',
          value: '',
          labelAttrs: {
            label: '颜色选择器'
          },
          formAttrs: {
          },
          formEvents: {}
        },
        {
          type: 'transfer',
          key: 'transfer',
          value: [],
          labelAttrs: {
            label: '穿梭框'
          },
          formAttrs: {
            data: [
              {
                key: 0,
                label: '备选项1'
              },
              {
                key: 1,
                label: '备选项2'
              },
              {
                key: 2,
                label: '备选项3'
              },
              {
                key: 3,
                label: '备选项4'
              }
            ]
          },
          formEvents: {}
        },
        {
          type: 'upload',
          key: 'upload',
          labelAttrs: {
            label: '上传文件'
          },
          formAttrs: {
            action: 'https://jsonplaceholder.typicode.com/posts/'
          },
          formEvents: {}
        },
        {
          type: 'submit',
          submit: {
            title: '保存',
            attrs: {
              type: 'primary'
            }
          },
          reset: {
            title: '重置'
          }
        }
      ]
    })
    const formModel = reactive({
      radio: 1,
      checkbox: [0, 1],
      username: 'Jaxson',
      inputNumber: 1,
      select: 0,
      selectGroup: 'Shanghai',
      cascader: [],
      cascaderPanel: [],
      switch: false,
      slider: 0,
      timePicker: new Date(),
      timeSelect: '08:30',
      datePicker1: '',
      datePicker2: '',
      rate: 0,
      colorPicker: '',
      transfer: [],
      upload: ''
    })

    // todo: remove 初始化国际化
    useI18n().locale.value = 'zh-cn'
    return {
      appFormRef,
      formConfig,
      formModel
    }
  }
})
</script>

<style scoped>

</style>
