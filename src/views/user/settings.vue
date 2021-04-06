<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：settings.vue
  - 创建日期：2021/3/1 下午9:26
  - 创建作者：jaxson
  -->

<template>
  <div class="user-settings-container">
    <el-card class="box-card user-settings-box-card">
      <el-tabs tab-position="left" class="user-settings-tab">
        <el-tab-pane label="基本设置">
          <el-container direction="vertical" class="user-settings-right-layout">
            <h3>基本设置</h3>
            <el-row :gutter="20" class="basic-settings">
              <el-col :span="12">
                <el-form
                  :model="userForm"
                  :rules="userFormRules"
                  ref="userFormRef"
                  label-position="top"
                  class="user-form"
                >
                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="userForm.nickname" placeholder="请输入用户昵称" />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email" placeholder="请输入用户邮箱" />
                  </el-form-item>
                  <el-form-item label="个人简介">
                    <el-input v-model="userForm.profile" type="textarea" placeholder="请输入用户个人简介" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm">更新信息</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-upload
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  class="avatar-uploader"
                >
                  <img v-if="userForm.avatar" :src="userForm.avatar" class="user-avatar" alt="用户头像" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="安全设置">安全设置</el-tab-pane>
        <el-tab-pane label="账号绑定">账号绑定</el-tab-pane>
        <el-tab-pane label="新消息通知">新消息通知</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'UserSettings',
  setup() {
    const userFormRef = ref(null)
    const userForm = reactive({
      nickname: '',
      email: '',
      profile: '',
      avatar: ''
    })
    const userFormRules = reactive({
      nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        { min: 2, max: 10, message: '昵称长度在 2 到 10 个字符', trigger: 'blur' }
      ],
      email: [{ type: 'email', required: true, message: '请输入用户邮箱', trigger: 'blur' }]
    })

    const handleAvatarSuccess = (res, file) => {
      reactive.value.avatar = URL.createObjectURL(file.raw)
    }

    const beforeAvatarUpload = file => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

    const submitForm = () => {
      userFormRef.value.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          ElMessage.warning('请仔细填写表单内容！')
          return false
        }
      })
    }

    return {
      userForm,
      userFormRules,
      userFormRef,
      handleAvatarSuccess,
      beforeAvatarUpload,
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>
.user-settings-container {
  height: 100%;
  .user-settings-box-card {
    height: 100%;
    :deep(.el-card),
    :deep(.el-card .el-card__body) {
      height: 100%;
    }
    .user-settings-tab {
      height: 100%;
      .user-settings-right-layout {
        flex: 1 1;
        padding: 0 25px;
        .basic-settings {
          .avatar-uploader {
            :deep(.el-upload) {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              &:hover {
                border-color: #409eff;
              }
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            }
            .user-avatar {
              width: 178px;
              height: 178px;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
