<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：index.vue
  - 创建日期：2021/1/26 下午4:21
  - 创建作者：Jaxson
  -->

<template>
  <div class="login-container">
    <div ref="loginWrapperRef" class="login-wrapper">
      <div class="login-left">
        <div class="login-left-logo">
          <img src="@/assets/images/logo.png" alt="logo" />
        </div>
        <div class="login-left-name">Vue3 Admin Plus</div>
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
        class="login-right login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">系统登陆</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.username"
            placeholder="用户账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="loginForm.password"
            :key="passwordType"
            :type="passwordType"
            ref="passwordRef"
            placeholder="用户密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPassword">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" class="login-submit" @click.prevent="handleLogin">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入登录账户！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('输入密码至少四位字母！'))
      } else {
        callback()
      }
    }

    const loading = ref(false)
    const passwordType = ref('password')
    const loginWrapperRef = ref(null)
    const passwordRef = ref(null)
    const loginFormRef = ref(null)
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const loginRules = reactive({
      username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      password: [{ required: true, trigger: 'blur', validator: validatePassword }]
    })

    const getOtherQuery = query => {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    const showPassword = () => {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      passwordRef.value.focus()
    }
    const handleLogin = () => {
      loginFormRef.value.validate(valid => {
        if (valid) {
          loading.value = true
          store
            .dispatch('user/login', loginForm)
            .then(() => {
              const query = route.query
              router.push({
                path: query ? query.redirect : '/',
                query: query ? getOtherQuery(query) : {}
              })
            })
            .finally(() => {
              loading.value = false
            })
        }
      })
    }

    // 加载过渡动画
    let init = 1000
    setTimeout(() => {
      loginWrapperRef.value.classList.toggle('open')
      init = 300
    }, init)

    return {
      loginForm,
      loginRules,
      loading,
      passwordType,
      loginWrapperRef,
      passwordRef,
      loginFormRef,
      showPassword,
      handleLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/images/login-bg.jpg');
  background-position: 50%;
  background-size: cover;

  .login-wrapper {
    position: relative;
    width: 800px;
    height: 440px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 50px rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    overflow: hidden;

    .login-left {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
      overflow: hidden;

      &-logo {
        display: block;
        transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
        object-position: left;
      }

      &-name {
        font-size: 1.5rem;
        margin-top: 2rem;
      }
    }

    :deep(.login-right.login-form) {
      position: absolute;
      top: 0;
      right: 0;
      width: 400px;
      transform: translateX(400px) translateZ(0);
      transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;

      .el-input {
        display: inline-block;
        height: 47px;
        width: 100%;

        input {
          background-color: transparent;
          border: 0;
          -webkit-appearance: none;
          border-radius: 0;
          padding: 12px 5px 12px 40px;
          color: #191f25;
          height: 47px;
          caret-color: #191f25;
          width: 100%;
        }
      }

      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        width: 100%;
      }

      .svg-container {
        padding: 4px 5px 4px 15px;
        color: #191f25;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        position: absolute;
        z-index: 1;
      }

      .title-container {
        position: relative;
        display: flex;
        align-items: baseline;
        .title {
          font-size: 26px;
          color: #191f25;
          margin: 0 auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #191f25;
        cursor: pointer;
        user-select: none;
      }

      .login-submit {
        width: 100%;
        margin-bottom: 30px;
      }
    }

    &.open {
      :deep(.login-right.login-form) {
        padding-left: 40px;
        padding-right: 40px;
      }
      .login-left {
        transform: translateX(-400px) translateZ(0);

        .login-left-logo {
          img {
            transform: translateX(210px) translateZ(0);
          }
        }

        .login-left-name {
          transform: translateX(210px) translateZ(0);
        }
      }

      .login-right {
        transform: translateX(0px) translateZ(0);
      }
    }
  }
}
</style>
