<template>
  <div class="login">
    <NavBar>
      <template #left>
        <van-icon name="arrow-left" />
      </template>
      <template #center>
        <h3>登录</h3>
      </template>
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </NavBar>
    <img src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" alt="logo" class="logo">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="validator" name="验证码" label="验证码" placeholder="输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]">
          <template #button>
            <image-verify ref="verifyRef"></image-verify>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <div class="register" @click="handleRegister">马上去注册</div>
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import NavBar from "./NavBar.vue"
import ImageVerify from "./ImageVerify.vue"

import md5 from 'js-md5'
import { ref ,defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { loginRequest } from '../network/user'

export default defineComponent({
  components: {
    NavBar,
    ImageVerify
  },
  setup() {
    const username=ref('')
    const password=ref('')
    const validator=ref('')
    const router=useRouter()
    const store=useStore()

    const verifyRef=ref(null)

    const onSubmit=async (values)=>{
      const imgCode=verifyRef.value.imgCode

      if(imgCode.toLowerCase()!==(validator.value).toLowerCase()){
        Toast.fail('验证码有误!')
        return
      }

      const res=await loginRequest({
        loginName:username.value,
        passwordMd5:md5(password.value)
      })

      localStorage.setItem('token',res.data)
      router.push('/home')
      store.commit('changeCurIndex',0)
    }

    const handleRegister=()=>{
      router.push('/register')
    }

    return {
      username,
      password,
      validator,
      verifyRef,
      onSubmit,
      handleRegister
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  .logo {
    display: block;
    width: 30vw;
    height: 25vw;
    padding: 3vw;
    margin: 10vw auto;
  }

  .register{
    margin-bottom:1rem;
    padding-left:0.5rem;

    font-size:1rem;
    color:#1989fa;

    cursor:pointer;
  }
}
</style>
