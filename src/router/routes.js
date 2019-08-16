export default [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/',
    name: 'Home',
    //alias 选项用来指定别名，它可以是一个字符串或者数组。我们指定别名为 '/topics' 后，那么来自该路径的访问实际上就是对首页的访问
    alias: '/topics',
    component: () => import('@/views/Home')
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  // 编辑资料路由
  {
    path: '/users/1/edit',
    component: () => import('@/views/users/Edit.vue'),
    //子路由的配置
    children: [
      {
        //path为空值 ''，表示该页面作为默认子路由，在导航到父级路由（/users/1/edit）时，就开始加载
        path: '',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile.vue'),
         // auth 为 true，标识当前路由需要登录才能访问
        meta: { auth: true }
      },
        // EditAvatar
      {
        path: '/users/1/edit_avatar',
        name: 'EditAvatar',
        component: () => import('@/views/users/Avatar.vue'),
        meta: { auth: true }
      },
      // EditPassword
      {
        path: '/users/1/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password.vue'),
        meta: { auth: true }
      }
    ]
  },
  // Create
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
    // Edit
  {
    path: '/articles/:articleId/edit',
    name: 'Edit',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
    // Column
  {
    path: '/:user',
    component: () => import('@/views/articles/Column'),
    children: [
      {
        path: '',
        name: 'Column',
        component: () => import('@/views/articles/List.vue')
      },
      {
        path: '/articles/:articleId/content',
        name: 'Content',
        component: () => import('@/views/articles/Content.vue')
      }
    ]
  },
]
