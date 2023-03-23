<template>
  <div class="detail">
    <nav-bar>
      <template #left>
        <van-icon name="arrow-left" />
      </template>
      <template #center>
        商品详情
      </template>
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </nav-bar>
    <div class="detail-info">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <template v-for="list in goodsDetailInfo.goodsCarouselList" :key="list">
          <van-swipe-item class="item">
            <img :src="list" alt="" class="picture">
          </van-swipe-item>
        </template>
      </van-swipe>
      <div class="info">
        <span class="name">{{ goodsDetailInfo.goodsName }}</span>
        <span class="tag">免邮费 顺丰快递</span>
        <span class="price">¥ {{ goodsDetailInfo.sellingPrice }}</span>
      </div>
      <ul class="param">
        <li>概述</li>
        <li>参数</li>
        <li>安装服务</li>
        <li>常见问题</li>
      </ul>
      <div class="product-content" v-html="goodsDetailInfo.goodsDetailContent || ''"></div>
    </div>
    <van-action-bar class="action-bar">
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="shop-o" text="店铺" />
      <van-action-bar-button type="warning" text="加入购物车" style="background: linear-gradient(to left, #0dc3c3, #098888)" />
      <van-action-bar-button type="danger" text="立即购买" style="background: linear-gradient(to right, #0dc3c3, #098888)" />
    </van-action-bar>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getGoodsDetailData } from "../../network/goods"

import NavBar from "../../components/NavBar.vue"

export default defineComponent({
  components: {
    NavBar
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const goodsDetailInfo = ref({})

    onMounted(async () => {
      const res = await getGoodsDetailData(route.params.id)

      goodsDetailInfo.value = res.data
    })

    return {
      goodsDetailInfo
    }
  }
})
</script>

<style lang="less" scoped>
.detail {
  padding-bottom: 5vh;

  .detail-info {
    .my-swipe {
      width: 100vw;
      height: 30vh;

      .item {
        display: flex;
        justify-content: center;
        align-items: center;

        .picture {
          width: 70%;
        }
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    padding: 2vw 3vw;

    span {
      margin-bottom: 0.5vh;
    }

    .name {
      font-size: 1.5rem;
      color: #333;
    }

    .tag {
      font-size: 0.8rem;
      color: #999;
    }

    .price {
      font-size: 1.5rem;
      color: #f63515;
    }
  }

  .param {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1vh 3vw;

    li {
      flex: 1;
    }
  }

  .product-content {
    width: 100vw;
  }

  .action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    width: 90vw;
    height: 5vh;
    padding: 0 3vw;
  }
}
</style>
