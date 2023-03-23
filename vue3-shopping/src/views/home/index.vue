<template>
  <div class="home">
    <!-- 导航 -->
    <nav-bar class="navbar">
      <template #left>
        <van-icon name="wap-nav" />
      </template>
      <template #center>
        <div class="search" @click="navigateTo('/search')">
          <span class="title">新峰商城</span>
          <span> | </span>
          <span class="desc">山河无恙，人间皆安</span>
        </div>
      </template>
      <template #right>
        <span v-if="!isLogin" @click="navigateTo('/login')">登录</span>
        <van-icon v-else name="manager-o" />
      </template>
    </nav-bar>
    <!-- 轮播 -->
    <van-swipe :autoplay="3000" indicator-color="#1baeae" class="swiper">
      <van-swipe-item v-for="image in swiperList" :key="image.carouselUrl">
        <img :src="image.carouselUrl" class="picture" />
      </van-swipe-item>
    </van-swipe>
    <!-- 推荐 -->
    <ul class="recommend">
      <li v-for="category in categoryList" :key="category.categoryId" @click="handleRecommend" class="item">
        <img :src="category.imgUrl" :alt="category.name" class="avatar">
        <span>{{ category.name }}</span>
      </li>
    </ul>
    <!-- 新品上线 -->
    <goods-item :listData="newGoodsList" label="新品上线" class="new-goods"></goods-item>
    <goods-item :listData="hotGoodsList" label="热门商品"></goods-item>
    <goods-item :listData="recentGoodsList" label="最新推荐"></goods-item>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { getHomeData } from "../../network/home"
import { categoryList } from "../../util/common"

import NavBar from "@/components/NavBar.vue"
import GoodsItem from "@/components/GoodsItem.vue"
import { Toast } from "vant"

export default defineComponent({
  components: {
    NavBar,
    GoodsItem
  },
  setup() {
    const router = useRouter()
    // 是否登录
    const isLogin = computed(() => localStorage.getItem('token') ? true : false)
    // 轮播图数据
    const swiperList = ref([])
    // 新品数据
    const newGoodsList=ref([])
    //热门商品
    const hotGoodsList=ref([])
    // 最近推荐
    const recentGoodsList=ref([])

    // 处理跳转
    const navigateTo = (path) => {
      router.push(path)
    }

    // 处理推荐页点击
    const handleRecommend = () => {
      Toast('敬请期待!')
    }

    // 请求数据
    onMounted(async () => {
      const res = await getHomeData()

      swiperList.value = res.data.carousels
      newGoodsList.value=res.data.newGoodses
      hotGoodsList.value=res.data.hotGoodses
      recentGoodsList.value=res.data.recommendGoodses
    })

    return {
      categoryList,
      isLogin,
      swiperList,
      newGoodsList,
      hotGoodsList,
      recentGoodsList,
      navigateTo,
      handleRecommend,
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  margin-bottom:5vh;
  .navbar {
    .search {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 90%;

      padding: 0.2vh 3vw;
      border: 0.1rem solid #eee;
      border-radius: 20vw;
      background-color: #fff;

      .title {
        margin-right: 3vw;
        font-size: 1.5rem;
        color: #1baeae;
      }

      .desc {
        margin-left: 2vw;
        color: #666;
      }
    }
  }

  .swiper {
    width: 100vw;
    height: 25vh;

    .picture {
      width: 100%;
      height: 100%;
    }
  }

  .recommend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100vw;
    height: 10vh;
    padding:1vh 0;
    margin-bottom:2vh;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      width:20vw;

      .avatar{
        width:40%;
        padding-top:5%;
      }
    }
  }

  .new-goods{
    margin-top:6vh;
  }
}
</style>
