import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
// 导入组件样式
import './index.scss'


/**
 * 标签栏首页
 */
export default class Index extends Component {

    componentDidMount() {
        this.initMap()
    }

    // 初始化地图
    initMap = () => {
        // 验证百度地图API是否成功引入，成功会输出百度地图提供的方法对象
        console.log(window.BMap)
        // 解构百度地图API
        const { BMap } = window
        // 1.创建地图实例
        const map = new BMap.Map('container')
        // 2.设置中心点坐标，天安门
        const point = new BMap.Point(116.404, 39.915)
        // 3.地图初始化，同时设置地图展示级别
        /**
         * 第一个参数：地图显示中心的位置
         * 第二个参数：地图缩放级别，数值越大，地图显示越详细，范围越小
         *                          数值越小，地图显示范围大，但是不详细
         */
        map.centerAndZoom(point, 15)
    }

    render() {
        return (
            <div className="mapBox">
                <NavBar mode="dark" icon={<Icon type="left"/>} onLeftClick={() => this.props.history.goBack()}>
                    地图找房
                </NavBar>
                {/* 地图容器，渲染百度地图 */}
                <div id="container"></div>
            </div>
        )
    }
}