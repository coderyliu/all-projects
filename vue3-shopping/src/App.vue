<template>
  <div class="app">
    <router-view></router-view>
    <TabBar v-if="isShowTabBar"></TabBar>
  </div>
</template>

<script>
import TabBar from "./components/TabBar.vue"

import { defineComponent, computed } from "vue"
import { useStore } from "vuex"

export default defineComponent({
  name: 'App',
  components: {
    TabBar
  },
  setup() {
    const store = useStore()

    const isShowTabBar = computed(() => store.state.isShowTabBar)

    return {
      isShowTabBar
    }
  }
})
</script>

<style lang="less" scoped>
</style>
