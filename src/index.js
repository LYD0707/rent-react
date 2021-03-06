import React from 'react';
import ReactDOM from 'react-dom';
// 全局样式
import './index.css';
// 根组件
import App from './App';
// PWA配置
import * as serviceWorker from './serviceWorker';

// 引入字体图标样式
import './assets/fonts/iconfont.css'

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
