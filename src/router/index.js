  // 创建路由
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import HomeComponent from '../../page/home/'
  import MemberComponent from '../../page/member/'
  import ShopcarComponent from '../../page/shopcar/'
  import SearchComponent from '../../page/search/'
  import newsList from '../../page/newsList'
  import newsinfo from '../../page/newsinfo'
  import photo from '../../page/photo'
  // 暴露目标
export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
      { path: '/home', component: HomeComponent },
      { path: '/member', component: MemberComponent },
      { path: '/shopcar', component: ShopcarComponent },
      { path: '/search', component: SearchComponent },
      { path:'/home/newsList',component:newsList},
      { path:'/home/newsinfo/:id',component: newsinfo},
      {path:'/photo',component:photo}
  ],
  linkActiveClass: 'mui-active'
})
