// 定义分类相关的API接口函数
import request from '@/utils/request'
// API接口 http://zhoushugang.gitee.io/erabbit-client-pc-document/api.html
/**
 * 获取所有分类数据(顶级，二级。对应的商品推荐数据)
 * return Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'GET')
}
