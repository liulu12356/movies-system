
// 1. 定义路由组件.
// 也可以从其他文件导入

import MovieList from "../components/Movie/MovieList.vue";
import SystemLogin from "../components/SystemLogin.vue";
import SystemIndex from "../components/SystemIndex.vue"
import Customer from '../components/Customer/Customer.vue';
import CustomerMovieList from "../components/Customer/CustomerMovieList.vue"
import CustomerMovie from '../components/Customer/CustomerMovie.vue'

import categories from "./category";
import schedules from "./schedule";
import tickets from "./ticket";
import VueRouter from "vue-router";
import Vue from "vue";


// 声明使用VueRouter
Vue.use(VueRouter);
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', redirect: "/login" },
  { path: '/login', component: SystemLogin },
  { path: '/indexCustomer', component: Customer,children:[
    { path: '/customerMovieList', component:CustomerMovieList },
    { path: '/customerMovie', component: CustomerMovie},
  ] },
  {
    path: '/index', component: SystemIndex, children: [
      ...categories,
      { path: '/movie', component: MovieList },
      ...schedules,
      ...tickets,]
  },

]

// 封装一个VueRouter实例
const router = new VueRouter({
  routes
});

export default router;
