// 首页请求函数
import request from './request'

export function getHomeData(){
  return request('get','/index-infos')
}
