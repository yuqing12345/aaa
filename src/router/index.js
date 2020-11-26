import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

Vue.use(Router)

function changeEnter(path,next) {
  // 取出你可以去的地址
  let menus_url = store.state.userInfo.menus_url
  if (menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
}

export const indexRouters = [{
    path: "menu",
    name: "菜单管理",
    component: () => import("../page/menu/menu.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/menu",next)
    }
  },
  {
    path: "role",
    name: "角色管理",
    component: () => import("../page/role/role.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/role",next)
    }
  },
  {
    path: "manage",
    name: "管理员管理",
    component: () => import("../page/manage/manage.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/manage",next)
    }
  },
  {
    path: "cate",
    name: "商品分类",
    component: () => import("../page/cate/cate.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/cate",next)
    }
  },
  {
    path: "specs",
    name: "商品规格",
    component: () => import("../page/specs/specs.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/specs",next)
    }
  },
  {
    path: "goods",
    name: "商品管理",
    component: () => import("../page/goods/goods.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/goods",next)
    }
  },
  {
    path: "member",
    name: "会员管理",
    component: () => import("../page/member/member.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/member",next)
    }
  },
  {
    path: "banner",
    name: "轮播图管理",
    component: () => import("../page/banner/banner.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/banner",next)
    }
  },
  {
    path: "seckill",
    name: "秒杀活动",
    component: () => import("../page/seckill/seckill.vue"),
    beforeEnter: (to, from, next) => {
      changeEnter("/seckill",next)
    }
  }
]

let router = new Router({
  routes: [{
      path: "/login",
      component: () => import("../page/login/login.vue")
    },
    {
      path: "/",
      component: () => import("../page/index/index.vue"),
      children: [{
          path: "",
          component: () => import("../page/home/home")
        },
        ...indexRouters
      ]
    }
  ]
})
// 登录拦截
router.beforeEach((to, from, next) => {
  //1、如果去的是登录页，就直接进
  if (to.path == '/login') {
    next()
    return
  }
  //2、如果去的是其他页面，验证仓库里面的token是否存在，如果存在说明登录过了。
  if (store.state.userInfo.token) {
    next();
    return
  }
  next("/login")
})


export default router
