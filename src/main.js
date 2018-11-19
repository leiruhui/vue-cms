// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 引入header
import { Header,Tabbar, TabItem  } from 'mint-ui';
// 注册header组件
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })