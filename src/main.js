// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入路由
import VueResource from 'vue-resource'
// 安装路由
Vue.use(VueResource)
// 请求根路径
Vue.http.options.root = 'http://lovegf.cn:8899'

Vue.config.productionTip = false
// 引入header
import { Header,Swipe, SwipeItem ,Button } from 'mint-ui';
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 注册header组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button)

// 定义全局的过滤器需安装: npm i moment -S
// 导入格式化时间的插件
import moment from 'moment';
// 定义全局的过滤器
Vue.filter('dateForm',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
})

/* eslint-disable no-new */
import app from './router/index.js'
new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })