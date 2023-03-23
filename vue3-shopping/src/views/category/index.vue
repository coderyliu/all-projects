<template>
  <div class="category">
    <nav-bar>
      <template #left>
        <van-icon name="arrow-left" @click="goHome" />
      </template>
      <template #center>
        <van-search v-model="searchValue" shape="round" disable placeholder="全场50元起步" @click-input="navigateToDetail"
          style="width:100%" />
      </template>
    </nav-bar>
    <div class="content">
      <van-sidebar v-model="active" @change="handleSlideBarToggle" class="slide-bar">
        <template v-for="slide in slideBarArr" :key="slide">
          <van-sidebar-item :title="slide" class="slide-item" />
        </template>
      </van-sidebar>
      <category-item :categoryList="currentListData" class="category-item"></category-item>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue"
import CategoryItem from "@/components/CategoryItem.vue"

import { defineComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getCategory } from "../../network/goods"
import { slideBarArr } from "../../util/common"

export default defineComponent({
  components: {
    NavBar,
    CategoryItem
  },
  setup() {
    // 路由router使用
    const router = useRouter()

    // 变量定义
    const searchValue = ref('')
    const active = ref(0)
    const categoryList = ref([])

    // 当前slideBar对应的categoryList
    const currentListData = ref([])

    // 监听 < 跳转首页
    const goHome = () => {
      router.push('/home')
    }


    // 监听搜索框的点击跳转
    const navigateToDetail = () => {
      router.push('/search')
    }

    // 监听侧边栏切换点击
    const handleSlideBarToggle = (index) => {
      currentListData.value = categoryList.value.filter((data) => {
        return data.categoryName === slideBarArr[active.value]
      })[0].secondLevelCategoryVOS
    }

    // 获取分类数据
    onMounted(async () => {
      const res = await getCategory()

      categoryList.value = res.data
      currentListData.value = res.data.filter((data) => {
        return data.categoryName === slideBarArr[active.value]
      })[0].secondLevelCategoryVOS
    })

    return {
      active,
      searchValue,
      slideBarArr,
      categoryList,
      currentListData,
      goHome,
      navigateToDetail,
      handleSlideBarToggle
    }
  }
})


</script>

<style lang="less" scoped>
.category {
  .content {
    display: flex;
    justify-content: flex-start;

    .slide-bar {
      width: 20vw;
      height: 90vh;

      background-color: rgb(247, 248, 250);

      .slide-item {
        text-align: center;
      }
    }

    .category-item{
      flex:1;
    }
  }
}
</style>
