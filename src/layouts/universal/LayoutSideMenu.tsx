/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：LayoutSideMenu.tsx
 * 创建日期：2021年09月08日
 * 创建作者：Jaxson
 */

import { defineComponent } from 'vue'
// import type { Index } from 'element-plus'

export default defineComponent({
  render: () => {
    const slot = {
      title: () => (<><i class="el-icon-message" /> 导航一</>)
    }
    const onSelect = (index: string, indexPath: string, item: any, routeResult: any) => {
      console.log(index)
      console.log(indexPath)
      console.log(item)
      console.log(routeResult)
    }
    return (
      <>
        <el-scrollbar height={'100vh'} wrap-class="side-menu-scrollbar">
          <el-menu default-openeds={['1']} className="border-none" onSelect={onSelect}>
            <el-sub-menu v-slots={slot} index="1">
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </>
    )
  }
})
