/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：LayoutSideMenu.tsx
 * 创建日期：2021年09月08日
 * 创建作者：Jaxson
 */

import { defineComponent } from 'vue'

export default defineComponent({
  render: () => (
    <>
      <el-scrollbar height={'100vh'} wrap-class="side-menu-scrollbar">
        <el-menu default-openeds={['1', '3']} className="border-none">
          <el-sub-menu index="1">
            {{
              // default: () => (<><i class="el-icon-message" /> 导航一</>)
            }}
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </>
  )
})
