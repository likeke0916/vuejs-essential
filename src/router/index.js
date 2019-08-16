import Vue from 'vue'
import Router from 'vue-router'
//引入router.js的默认值
import routes from './routes'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  /*
    linkExactActiveClass 的值是一个类名，用来添加到与当前路由对应的 <router-link> 上，
    以显示当前精确激活的 <router-link>，
    其默认值是 'router-link-exact-active'，我们这里改为 'active' 以利用 Bootstrap 的激活样式
  */
  linkExactActiveClass: 'active',
    // 指定滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // 有锚点时，滚动到锚点
      return { selector: to.hash }
    } else if (savedPosition) {
      // 有保存位置时，滚动到保存位置
      return savedPosition
    } else {
      // 默认滚动到页面顶部
      return { x: 0, y: 0 }
    }
  },
  routes
})

//全局前置守卫
router.beforeEach( (to, from, next) => {
  const app = router.app
  const store = app.$options.store
  const auth = store.state.auth

  // 获取目标页面路由参数里的 articleId
  const articleId = to.params.articleId
   // 当前用户
  const user = store.state.user && store.state.user.name
  // 路由参数中的用户
  const paramUser = to.params.user
  // 隐藏消息提示
  app.$message.hide()

  /*
    获取仓库里的登录信息
    使用 router.app 可以获取 router 对应的 Vue 根实例，使用实例的 $options.store 可以从选项中访问仓库
  */
  /*
    实例的 $options 是用于当前 Vue 实例的初始化选项：
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created() {
        console.log(this.$options.el) // => '#app'
      }
    })
  */
  //const auth = router.app.$options.store.state.auth
 // 如果当前用户已登录，且目标路由包含 /auth/ ，就跳转到首页
  if ((auth && to.path.indexOf('/auth/') !== -1) ||
    (!auth && to.meta.auth) ||
    // 有 articleId 且不能找到与其对应的文章时，跳转到首页
    (articleId && !store.getters.getArticleById(articleId)) ||
    // 路由参数中的用户不为当前用户，且找不到与其对应的文章时，跳转到首页
    (paramUser && paramUser !== user && !store.getters.getArticlesByUid(null, paramUser).length)
    ) {
    //使用 next('/') 或者 next({ path: '/' }) 来跳转到一个新的地址
    next('/')
  }else{
    next()
  }
})

// 注册全局后置钩子
router.afterEach((to, from) => {
  const app = router.app
  const store = app.$options.store
  // 获取目标页面路由参数里的 showMsg
  const showMsg = to.params.showMsg

  if (showMsg) {
    // showMsg 是一个字符时，使用它作为消息内容
    if (typeof showMsg === 'string') {
      // 显示消息提示
      app.$message.show(showMsg)
    } else {
      // 显示操作成功
      app.$message.show('操作成功')
    }
  }
})

export default router
