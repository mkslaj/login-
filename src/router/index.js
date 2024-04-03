import { createRouter, createWebHistory } from 'vue-router'
import UserInfo from "@/views/user/UserInfo.vue";
import UserResetPassword from "@/views/user/UserResetPassword.vue";
import UserAvatar from "@/views/user/UserAvatar.vue";
import ArticleManage from "@/views/article/ArticleManage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      // 使用动态导入加载Login组件
      component: () => import('@/views/login.vue')
    },
    {
      path: '/',
      component:()=>import('@/views/Layout.vue'),
      children:[
        {path:'/article/manage',component:ArticleManage},
        {path:'/user/info',component:UserInfo},
        {path:'/user/resetPassword',component:UserResetPassword},
        {path:'/user/avatar',component:UserAvatar},

      ]
    }
  ]
})

export default router
