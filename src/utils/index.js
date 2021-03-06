// 全局公共方法

import { getCityInfo } from './api/city'

/**
 * 业务流程
 * 1.如果没有本地数据，利用百度地图API获取当前城市->发送请求，获取城市详细信息，并保存本地数据，Promise返回城市数据
 * 2.如果有本地数据->直接Promise.resolve返回数据
 */
export function getCurrCity() {
    // 从本地获取定位数据
    const cityInfo = JSON.parse(sessionStorage.getItem('CURR_CITY'))
    // 本地没有定位数据
    if (!cityInfo) {
        return new Promise((resolve, reject) => {
            // 本地之前没有存储过定位信息
            const { BMap } = window
            // 根据IP定位->LocalCity
            // 1.获取定位实例
            const myCity = new BMap.LocalCity()
            // 2.获取定位信息，通过回调函数获取定位信息
            myCity.get(async (res) => {
                // console.log(res.name)
                const { status, data, description } = await getCityInfo(res.name)
                if (status === 200) {
                    // 本地存储定位信息
                    sessionStorage.setItem('CURR_CITY', JSON.stringify(data))
                    // 返回定位数据
                    resolve(data)
                } else {
                    reject(description)
                }
            })
        })
    } else {
        // 本地存储过定位信息
        return Promise.resolve(cityInfo)
    }
}

// 封装本地持久化方法
// 存储
export function setLocalData(key, val) {
    localStorage.setItem(key, val)
}

// 获取
export function getLocalData(key) {
    return localStorage.getItem(key)
}

// 删除
export function delLocalDAta(key) {
    localStorage.removeItem(key)
}

/**
 * 本地数据持久化（数据存储）
 * 1.sessionStorage：存储大小 5M 关闭浏览器/标签就删除了
 * 2.localStorage：存储大小 5M 除非用户手动删除
 * 3.cookie：存储大小 4KB 不安全，可以设置有效期 | 没有设置，相当于sessionStorage
 * 4.IndexeDB：大小没有限制
 */