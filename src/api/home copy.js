// 提供首页相关接口AIP函数
import request from '@/utils/request'
// API接口 http://zhoushugang.gitee.io/erabbit-client-pc-document/api.html

/**
 * 获取热门品牌
 * @paran {Integer} limit - 品牌个数
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return request({
    url: '/home/brand',
    method: 'GET',
    limit
  })
}
