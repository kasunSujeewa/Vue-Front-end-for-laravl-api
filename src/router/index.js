import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      forVisitors: true
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      forVisitors: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/hello',
    name: 'hello',
    component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue'),
    meta: {
      requireAuth: true
    }

  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

})

export default router
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!localStorage.getItem("token")) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
  const userAuth = to.meta.requireAuth
  const forVisitors = to.meta.forVisitors;
});

