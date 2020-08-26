import request from '../request'

/**
 *  城市区域后台接口
 */

 /**
  * 根据城市名字获取城市详细信息
  * @param {*} name 城市名
  */
export function getCityInfo(name) {
    // 返回的时promise
    return request.get('/area/info', {
        params: {
            name
        }
    })
}

/**
 * 
 * @param {*} level 1 表示获取所有城市数据 2 表示城市辖区的数据
 */
export function getCityDate(level = 1) {
    return request.get('/area/city', {
        params: {
            level
        }
    })
}

/**
 * 获取热门城市数据
 */
export function getHotCity() {
    return request.get('/area/hot')
}