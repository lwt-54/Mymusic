import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend'
import  Toplist from '../components/Toplist'
import Search from '../components/Search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },{
    	path: '/toplist',
    	name: 'Toplist',
    	component: Toplist
    },{
    	path: '/search',
    	name: 'Search',
    	component: Search
    }
  ]
})
