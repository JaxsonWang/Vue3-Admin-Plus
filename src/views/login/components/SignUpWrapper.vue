<template>
  <div class="handle-login-wrapper m-auto xl:m-0">
    <div class="login-text enter-right mb-3 text-center xl:text-left">{{ isReset ? '找回密码' : '系统注册' }}</div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="default" class="login-form" @keyup.enter="handleLogin">
      <el-form-item prop="username" class="enter-right">
        <el-input v-model="loginForm.username" placeholder="注册账号" prefix-icon="user" />
      </el-form-item>
      <el-form-item prop="phone" class="enter-right">
        <el-input v-model="loginForm.phone" placeholder="手机号码" prefix-icon="iphone" />
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
      <el-form-item prop="password" class="enter-right">
        <el-input v-model="loginForm.password" :type="passwordType" placeholder="注册密码" prefix-icon="lock">
          <template #append>
            <el-button :icon="passwordType === 'password' ? 'unlock' : 'lock'" @click="showPassword(1)" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password2" class="enter-right">
        <el-input v-model="loginForm.password2" :type="password2Type" placeholder="确认密码" prefix-icon="lock">
          <template #append>
            <el-button :icon="password2Type === 'password' ? 'unlock' : 'lock'" @click="showPassword(2)" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="enter-right">
        <el-button :loading="loading" type="primary" class="w-full" @click="handleLogin">{{ isReset ? '重 置' : '注 册' }}</el-button>
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

const prop = defineProps({
  isReset: {
    required: false,
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['login-type'])
const loginForm = ref({
  username: '',
  phone: '',
  code: '',
  password: '',
  password2: ''
})
const loginRules = ref({
  username: [
    { required: true, trigger: 'blur', message: '请输入注册账号' }
  ],
  phone: [
    { required: true, trigger: 'blur', message: '手机号码不得为空' },
    {
      validator: (rule: Record<string, unknown>, value: string, callback: ValidateFieldCallback) => {
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
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入注册密码' },
    { min: 6, max: 20, trigger: 'blur', message: '密码长度在 6 到 20 个字符' }
  ],
  password2: [
    { required: true, trigger: 'blur', message: '请输入确认密码' },
    {
      validator: (rule: Record<string, unknown>, value: string, callback: ValidateFieldCallback) => {
        if (loginForm.value.password !== value) {
          callback('注册密码和确认密码不相同，请重新检查密码！')
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
const loading = ref(false)
const codeTime = ref(60)
const isCoding = ref(false)
const passwordType = ref('password')
const password2Type = ref('password')
const loginFormRef = ref()

let timer: TimeoutHandle

const handleLogin = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('按钮类型：', prop.isReset ? '找回密码' : '注册账号')
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
const showPassword = (type: number) => {
  if (type === 2) {
    password2Type.value = password2Type.value === 'password' ? 'text' : 'password'
  } else {
    passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
  }
}
</script>

<style lang="scss" scoped>
@import "../style";
</style>
