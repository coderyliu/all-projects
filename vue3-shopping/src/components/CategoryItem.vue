<template>
  <div class="category-wrapper">
    <template v-for="lists in categoryList" :key="lists.categoryId">
      <h2 class="title">{{lists.categoryName}}</h2>
      <ul class="item">
        <template v-for="list in lists.thirdLevelCategoryVOS" :key="list.categoryId">
          <li class="second-item" @click="navigateToDetail(list.categoryId)">
            <img src="http://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" alt="" class="picture">
            <span class="name">{{list.categoryName}}</span>
          </li>
        </template>
      </ul>

    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import {useStore} from "vuex"

export default defineComponent({
  props:{
    categoryList:{
      type:Object,
      required:true,
      default:()=>{}
    }
  },
  setup(){
    const router=useRouter()
    const store=useStore()

    // 处理跳转商品详情页
    const navigateToDetail=(id)=>{
      router.push({
        path:'/home'
      })

      store.commit('changeCurIndex',0)
    }

    return {
      navigateToDetail
    }
  }
})
</script>

<style lang="less" scoped>
.category-wrapper{
  .title{
    margin-left:2vw;
    font-size:1.5rem;
    color:#2c3e50;
  }

  .item{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    margin-bottom:5vh;
    padding:1vh;

    .second-item{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      width:30%;
      padding:1vh;
      box-sizing: border-box;

      .picture{
        width:30%;
      }

      .name{
        margin-top:1vh;
      }
    }
  }
}
</style>
