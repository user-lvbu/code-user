import Vue from "vue";
import VueRouter from "vue-router";
import UserList from '@/components/UserList.vue'
import UserDetail from '@/components/UserDetail.vue'

//  安装路由插件
Vue.use(VueRouter)

// 创建路由实例对象
const router = new VueRouter({
  routes:[
    {path:'/users',component: UserList},
    {path:'/',redirect:'/users'},
    {path:'/users/:id',component:UserDetail,props:true}
    
  ],
})

// 向外共享路由实例对象
export default router