import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import FrontEnd from '@/components/FrontEnd';
import Products from '@/components/pages/Products';
import OrderList from '@/components/pages/OrderList';
import Coupon from '@/components/pages/Coupon';
import CustomerOrder from '@/components/pages/CostomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import FrontHome from '@/components/pages/FrontHome';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'FrontEnd',
      component: FrontEnd,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: FrontHome,
        },
      ]
    },

    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        { 
          path: 'order_list',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
        
      ]
    },

    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'customerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'customerCheckout',
          component: CustomerCheckout,
        },
      ]
    },        

  ]
})
