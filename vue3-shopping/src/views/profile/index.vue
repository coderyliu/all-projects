<template>
  <div class="profile">
    <nav-bar>
      <template #left>
        <van-icon name="arrow-left" />
      </template>
      <template #center>
        我的
      </template>
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </nav-bar>
    <div class="infoPanel">
      <div class="left">
        <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="" class="avatar">
      </div>
      <div class="right">
        <span>昵称：{{ userInfo.nickName }}</span>
        <span>登录名：{{ userInfo.loginName }}</span>
        <span>个性签名：{{ userInfo.introduceSign }}</span>
      </div>
    </div>
    <ul class="tag-wrapper">
      <template v-for="list in profileListData" :key="list">
        <li class="item">
          <span class="title">{{list}}</span>
          <van-icon name="arrow" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

import { defineComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getUserInfo } from "../../network/user"
import { profileListData } from "../../util/common"

export default defineComponent({
  components: {
    NavBar
  },
  setup() {
    const userInfo = ref({})

    onMounted(async () => {
      const res = await getUserInfo()
      userInfo.value = res.data
    })

    return {
      userInfo,
      profileListData
    }
  }
})
</script>

<style lang="less" scoped>
.profile {
  .infoPanel {
    display: flex;
    justify-content: space-around;
    align-items: center;

    width:95vw;
    height:12vh;
    margin:1vh auto;

    border-radius:2vw;
    box-shadow: 2vw 2vh 2vw rgba(0,0,0,.1);

    background: linear-gradient(90deg,#1baeae,#51c7c7);

    .left {
      flex: 1;
      text-align: center;
      .avatar {
        width:50%;
        border-radius: 50%;
      }
    }

    .right {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;

      color:#fff;
      font-size: 1.2rem;
    }
  }
  .tag-wrapper{

    width:95vw;
    margin:0 auto;

    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;

      height: 5vh;

      border-bottom:1px solid #eee;
    }
  }
}
</style>
