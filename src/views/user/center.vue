<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：center.vue
  - 创建日期：2021/3/1 下午8:39
  - 创建作者：jaxson
  -->

<template>
  <div class="user-center-container">
    <el-row :gutter="20" class="user-center-row">
      <el-col :sm="24" :md="6" :lg="6" class="user-center-col">
        <el-card class="box-card user-box-card">
          <div class="user-header">
            <el-avatar
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              size="large"
              class="user-avatar"
            />
            <h3 class="user-name">淮城一只猫</h3>
            <p class="user-desc">永远年轻，永远热泪盈眶！</p>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="18" :lg="18" class="user-center-col">
        <el-card class="box-card"> 正在开发... </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserCenter'
}
</script>

<style lang="scss" scoped>
.user-center-container {
  height: 100%;
  .user-center-col {
    margin-bottom: 24px;
    .user-box-card {
      .user-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        .user-avatar {
        }
        .user-name {
          margin: 14px 0 0;
        }
        .user-desc {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
