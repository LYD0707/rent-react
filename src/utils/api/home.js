import request from '../request'

/**
 * 首页后台接口
 */

/**
 * 轮播图
 */
export function getSwiper() {
    return request.get('/home/swiper')
}

/**
 * 租房小组
 * @param {*} area 区域ID（城市ID）
 */
export function getGrid(area = 'AREA|88cff55c-aaa4-e2e0') {
    return request.get('/home/groups', {
        params: {
            area
        }
    })
}

/**
 * 最新资讯
 * @param {*} area 区域ID（城市ID）
 */
export function getNews(area = 'AREA|88cff55c-aaa4-e2e0') {
    return request.get('/home/news', {
        params: {
            area
        }
    })
}