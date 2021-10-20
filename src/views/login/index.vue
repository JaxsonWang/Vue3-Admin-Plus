<template>
  <div class="login-container w-full h-full overflow-hidden px-10">
    <div class="container relative h-full py-4 mx-auto sm:px-10">
      <div class="grid grid-cols-4 gap-4 flex h-full">
        <introduction />
        <div class="col-span-full lg:col-span-2 my-auto">
          <component
            :is="loginType"
            :is-reset="isResetWrapper"
            :redirect="redirect"
            @login-type="getLoginType"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

import Introduction from './components/Introduction.vue'
import LoginWrapper from './components/LoginWrapper.vue'
import PhoneWrapper from './components/PhoneWrapper.vue'
import QrCodeWrapper from './components/QRCodeWrapper.vue'
import SignUpWrapper from './components/SignUpWrapper.vue'

let loginType = LoginWrapper
let isResetWrapper = false
let redirect = null

watch(() => useRoute(), route => {
  redirect = route.query && route.query.redirect
}, {
  immediate: true
})

const getLoginType = (type: string) => {
  switch (type) {
    case 'phone':
      loginType = PhoneWrapper
      break
    case 'qrcode':
      loginType = QrCodeWrapper
      break
    case 'signup':
      loginType = SignUpWrapper
      isResetWrapper = false
      break
    case 'rest-account':
      loginType = SignUpWrapper
      isResetWrapper = true
      break
    default:
      loginType = LoginWrapper
  }
}

</script>

<style lang="scss" scoped>
@import "style";

.login-container {
  background-color: #293146;
  &::before {
    background-image: initial;
  }
}

@screen lg {
  .login-container {
    background-color: transparent;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -50%;
      content: '';
      background-image: url("./src/assets/login_images/login-bg.svg");
      background-repeat: no-repeat;
      background-position: 100%;
      background-size: auto 100%;
    }
  }
}
</style>
