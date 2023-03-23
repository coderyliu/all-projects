import {
  createApp
} from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// Vant组件库，按需引入
import loadComponent  from './util/loadComponent'

// 引入全局样式
import 'vant/lib/index.css'

const app = createApp(App)

loadComponent(app)
app.use(router)
app.use(store)

app.mount('#app')
