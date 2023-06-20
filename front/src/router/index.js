import Vue from 'vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
import { Lazyload } from 'vant'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { SubmitBar } from 'vant';


import 'vant/lib/index.css'
Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(VueRouter);
Vue.use(SubmitBar);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
    meta:{
      index:1,
      showFooter:false
    }
  },
    {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin.vue'),
        meta:{
          index:1,
          showFooter:false
        },
        children:[
          {
              path: '/people',
              name: 'people',
              component: () => import(/* webpackChunkName: "about" */ '../views/people.vue'),
            },
            {
              path: '/animal',
              name: 'animal',
              component: () => import(/* webpackChunkName: "about" */ '../views/animal.vue'),
            },{
              path: '/shop',
              name: 'shop',
              component: () => import(/* webpackChunkName: "about" */ '../views/shop.vue'),
             
            },{
              path: '/video',
              name: 'video',
              component: () => import(/* webpackChunkName: "about" */ '../views/video.vue'),
          },{
            path: '/stuff',
            name: 'stuff',
            component: () => import(/* webpackChunkName: "about" */ '../views/stuff.vue'),
        }
        ]
      },
      {
        path: '/people',
        name: 'people',
        component: () => import(/* webpackChunkName: "about" */ '../views/people.vue'),
        meta:{
          index:1,
          showFooter:false
        }
      },
      {
        path: '/animal',
        name: 'animal',
        component: () => import(/* webpackChunkName: "about" */ '../views/animal.vue'),
        meta:{
          index:1,
          showFooter:false
        }
      },{
        path: '/shop',
        name: 'shop',
        component: () => import(/* webpackChunkName: "about" */ '../views/shop.vue'),
        meta:{
          index:1,
          showFooter:false
        }
      },{
        path: '/video',
        name: 'video',
        component: () => import(/* webpackChunkName: "about" */ '../views/video.vue'),
        meta:{
          index:1,
          showFooter:false
        }
      },{
        path: '/stuff',
        name: 'stuff',
        component: () => import(/* webpackChunkName: "about" */ '../views/stuff.vue'),
      }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
