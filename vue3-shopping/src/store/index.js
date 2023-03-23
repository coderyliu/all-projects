import {
  createStore
} from "vuex"

const store = createStore({
  state() {
    return {
      currentIndex: 0,
      isShowTabBar: true
    }
  },
  getters: {},
  mutations: {
    changeCurIndex(state, payload) {
      state.currentIndex = payload
    },
    changeTabBarShow(state, payload) {
      state.isShowTabBar = payload
    }
  },
  actions: {},
  modules: {}
})

export default store
