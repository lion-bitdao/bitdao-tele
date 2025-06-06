import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/test',
    component: () => import('@/views/user/test'),
    hidden: true
  },
  {
    path: '/vip',
    component: () => import('@/views/user/vip'),
    hidden: true
  },
  {
    path: '/dailyforcast',
    component: () => import('@/views/user/dailyforcast'),
    hidden: true
  },
  {
    path: '/verifyemail',
    component: () => import('@/views/user/verifyemail'),
    hidden: true
  },
  {
    path: '/notification',
    component: () => import('@/views/user/notification'),
    hidden: true
  },
  {
    path: '/fortunehistory',
    component: () => import('@/views/user/fortunehistory'),
    hidden: true
  },
  {
    path: '/more',
    component: () => import('@/views/user/more'),
    hidden: true
  },
  {
    path: '/edituserprofile',
    component: () => import('@/views/user/edituserprofile'),
    hidden: true
  },
  {
    path: '/userprofile',
    component: () => import('@/views/user/userprofile'),
    hidden: true
  },
  {
    path: '/aurahistory',
    component: () => import('@/views/user/aurahistory'),
    hidden: true
  },
  {
    path: '/profile',
    component: () => import('@/views/user/profile'),
    hidden: true
  },
  {
    path: '/divination',
    component: () => import('@/views/divination/divination'),
    hidden: true
  },
  {
    path: '/luckynumber',
    component: () => import('@/views/luckynumber/luckynumber'),
    hidden: true
  },
  {
    path: '/goodday',
    component: () => import('@/views/goodday/goodday'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'hash', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
