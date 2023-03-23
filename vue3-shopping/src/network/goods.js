import request from "./request"

// 封装商品页面的接口
export function getCategory() {
  return request('get', '/categories')
}

// 商品详情信息
export function getGoodsDetailData(id) {
  return request('get', `/goods/detail/${id}`)
}
