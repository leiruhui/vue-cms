// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入路由
import VueResource from 'vue-resource'
// 安装路由
Vue.use(VueResource)

Vue.config.productionTip = false
// 引入header
import { Header,Swipe, SwipeItem  } from 'mint-ui';
// 注册header组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

/* eslint-disable no-new */
import app from './router/index.js'
new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })