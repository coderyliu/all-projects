import axios from 'axios'
import router from "../router"
import { Toast} from "vant"

// 公共配置
axios.defaults.baseURL = 'http://backend-api-01.newbee.ltd/api/v1'
axios.defaults.withCredentials=true
axios.defaults.headers['token']=localStorage.getItem('token')||''
axios.defaults.headers.post['Content-Type']='application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }

  if (res.data.resultCode != 200) {
    if (res.data.message) Toast.fail(res.data.message)
    if (res.data.resultCode == 416) {
      router.push({
        path: '/login'
      })
    }

    return Promise.reject(res.data)
  }

  return res.data
})

function request(method, url, data={}) {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default request
