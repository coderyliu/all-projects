// 用户个人中心配置请求
import request from './request'

// 登录请求接口
export function loginRequest(data) {
  return request('post','/user/login',data)
}

// 注册请求接口
export function registerRequest(data){
  return request('post','/user/register',data)
}

// 获取个人信息接口
export function getUserInfo(){
  return request('get','/user/info')
}
