<template>
  <div class="tabbar">
    <div class="item" :class="[currentIndex === 0 ? 'active' : '']" @click="navigate('/home')">
      <van-icon name="shop-o" class="icon" />
      <span class="title">首页</span>
    </div>
    <div class="item" :class="[currentIndex === 1 ? 'active' : '']" @click="navigate('/category')">
      <van-icon name="qr" class="icon" />
      <span class="title">分类</span>
    </div>
    <div class="item" :class="[currentIndex === 2 ? 'active' : '']" @click="navigate('/cart')">
      <van-icon name="shopping-cart-o" class="icon" />
      <span class="title">购物车</span>
    </div>
    <div class="item" :class="[currentIndex === 3 ? 'active' : '']" @click="navigate('/profile')">
      <van-icon name="manager-o" class="icon" />
      <span class="title">我的</span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const currentIndex = computed(() => store.state.currentIndex)

    const navigate = (path) => {
      if (path === '/home') {
        store.commit('changeCurIndex', 0)
      } else if (path === '/category') {
        store.commit('changeCurIndex', 1)
      } else if (path === '/cart') {
        store.commit('changeCurIndex', 2)
      } else {
        store.commit('changeCurIndex', 3)
      }

      router.push(path)
    }

    return {
      currentIndex,
      navigate
    }
  }
})
</script>

<style lang="less" scoped>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100vw;
  height: 5vh;
  border-top: 1px solid #eee;

  background-color: white;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    height: 100%;

    .icon {
      font-size: 1.5rem;
    }

    .title {
      font-size: 0.9rem;
    }
  }

  .active {
    color: #1baeae;
  }

}
</style>
