import React, { Component } from 'react'

// 导入组件
import { Carousel, Grid, Flex, WingBlank } from 'antd-mobile'

// 首页样式
import './index.scss'
// 导入axios
import { getSwiper, getGrid, getNews } from '../../utils/api/home'
import { BASE_URL } from '../../utils/request'

// 导入栏目导航数据
import Navs from '../../utils/nav'


/**
 * 标签栏首页
 */
export default class Index extends Component {
    state = {
        // 轮播图数据
        swiper: [],
        // 轮播图默认高度
        imgHeight: 212,
        // 控制是否自动播放
        isPlay: false,
        // 租房小组数据
        groups: [],
        // 最新资讯数据
        news: []
    }


    // 相当于vue中created
    componentDidMount() {
        this.getSwiper()
        this.getGroups()
        this.getNews()
    }

    // 获取轮播图数据
    async getSwiper() {
        const res = await getSwiper()
        // console.log(res)
        if (res.status === 200) {
            this.setState({
                swiper: res.data
            }, () => {
                this.setState({
                    isPlay: true
                })
                // console.log(this.state.swiper)
            })
        }
    }

    // 获取租房小组数据
    async getGroups() {
        const res = await getGrid()
        // console.log(res)
        if (res.status === 200) {
            this.setState({
                groups: res.data
            })
            // console.log(this.state.groups)
        }
    }

    // 获取最新资讯
    async getNews() {
        const res = await getNews()
        console.log(res)
        if (res.status === 200) {
            this.setState({
                news: res.data
            })
        }
    }

    // 渲染轮播图
    renderSwiper = () => {
        return (
            <Carousel
                // 是否自动切换
                autoplay={this.state.isPlay}
                // 是否循环播放
                infinite>
                {this.state.swiper.map((item) => (
                    <a
                        key={item.id}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img
                            src={`http://api-haoke-dev.itheima.net${item.imgSrc}`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // 轮播图图片适配=>自适应
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }

    // 渲染栏目导航
    renderNavs = () => {
        return (
            <Flex className="nav">
                {
                    Navs.map((item) => (
                        <Flex.Item
                            key={item.id}
                            justify="between"
                            onClick={() => {
                                // 点击跳转路由
                                this.props.history.push(item.url)
                            }}>
                            <img alt="" src={item.icon} />
                            <p>{item.title}</p>
                        </Flex.Item>
                    ))
                }
            </Flex>
        )
    }

    // 渲染租房小组
    renderRent = () => {
        return (
            <Grid data={this.state.groups}
                columnNum={2}
                // 是否有边框
                hasLine={false}
                // 每个格子是否固定为正方形
                square={false}
                renderItem={(item) => (
                    // item结构
                    <Flex className="grid-item" justify="between">
                        <div className="desc">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                        <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                    </Flex>
                )}
            />
        )
    }

    // 渲染最新咨询
    renderNews = () => {
        return (
            this.state.news.map((item) => (
                <div className="news-item" key={item.id}>
                    <div className="imgwrap">
                        <img className="img" src={`${BASE_URL}${item.imgSrc}`} alt="" />
                    </div>
                    <Flex className="content" direction="column" justify="between">
                        <h3 className="title">{item.title}</h3>
                        <Flex className="info" justify="between">
                            <span>{item.from}</span>
                            <span>{item.date}</span>
                        </Flex>
                    </Flex>
                </div>
            ))
        )
    }

    render() {
        return (
            <div className="Index">
                {/* 轮播图 */}
                {this.renderSwiper()}
                {/* 栏目导航 */}
                {this.renderNavs()}
                {/* 租房小组 */}
                <div className="group">
                    {/* title */}
                    <Flex className="group-title" justify="between">
                        <h3>租房小组</h3>
                        <span>更多</span>
                    </Flex>
                    {/* 内容 */}
                    {this.renderRent()}
                </div>
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        )
    }
}