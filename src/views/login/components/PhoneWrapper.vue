<template>
  <div class="handle-login-wrapper m-auto lg:m-0">
    <div class="login-text enter-right mb-3 text-center lg:text-left">手机登录</div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="default" class="login-form" @keyup.enter="handleLogin">
      <el-form-item prop="phone" class="enter-right">
        <el-input v-model="loginForm.phone" placeholder="手机号码" prefix-icon="phone" />
      </el-form-item>
      <el-form-item prop="code" class="enter-right">
        <el-input v-model="loginForm.code" placeholder="短信验证码" prefix-icon="message">
          <template v-if="isCoding" #append>
            <el-button :loading="isCoding"> {{ codeTime }} 秒</el-button>
          </template>
          <template v-else #append>
            <el-button icon="chat-line-round" @click="getCode">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="enter-right">
        <el-button :loading="loading" type="primary" class="w-full" @click="handleLogin">登 录</el-button>
      </el-form-item>
      <el-form-item class="enter-right">
        <el-button class="w-full" @click="emit('login-type', 'back')">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ValidateFieldCallback } from 'element-plus'
import { isPhoneNumber } from '@/utils/validate'

const loginForm = ref({
  phone: '',
  code: ''
})
const loginRules = ref({
  phone: [
    { required: true, trigger: 'blur', message: '手机号码不得为空' },
    {
      validator: (rule: Record<string, unknown>, value: string, callback: ValidateFieldCallback) => {
        console.log('rule', rule)
        console.log('value', value)
        if (!isPhoneNumber(value)) {
          callback('手机号码格式不正确！')
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, trigger: 'blur', message: '短信验证码不得为空' }
  ]
})
const loading = ref(false)
const codeTime = ref(60)
const isCoding = ref(false)
const loginFormRef = ref()

let timer: TimeoutHandle

const emit = defineEmits(['login-type'])

const handleLogin = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const getCode = () => {
  ElMessage.success('已发送短信验证码，请注意查收！')
  isCoding.value = true
  timerTask()
}

const timerTask = () => {
  if (codeTime.value > 0) {
    timer = setTimeout(() => {
      codeTime.value--
      timerTask()
    }, 1000)
  } else {
    clearTimeout(timer)
    codeTime.value = 60
    isCoding.value = false
  }
}
</script>

<style lang="scss" scoped>
@import "../style";
</style>
