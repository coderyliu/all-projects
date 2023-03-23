<template>
  <div class="goods-wrapper">
    <h3 class="label">{{ label }}</h3>
    <ul class="goods-wrap">
      <li v-for="list in listData" :key="list.goodsId" class="item" @click="navigateToDetail(list.goodsId)">
        <img :src="list.goodsCoverImg" alt="" class="picture">
        <span class="name">{{ list.goodsIntro }}</span>
        <span class="price">¥ {{ list.sellingPrice }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },
    listData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const router = useRouter()
    const store=useStore()

    const navigateToDetail = (id) => {
      router.push(`/detail/${id}`)
      store.commit('changeTabBarShow',false)
    }

    return {
      navigateToDetail
    }
  }
})
</script>

<style lang="less" scoped>
.goods-wrapper {
  .label {
    height: 5vh;
    line-height: 5vh;
    margin: 0;

    font-size: 1.2rem;
    color: #1baeae;
    text-align: center;

    background-color: #eee;
  }

  .goods-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    width: 100vw;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      width: 50%;
      height: 25vh;
      border: 1px solid #eee;
      border-left: none;

      box-sizing: border-box;

      .picture {
        width: 30%;
      }

      .price {
        color: #1baeae;
      }
    }
  }
}
</style>
