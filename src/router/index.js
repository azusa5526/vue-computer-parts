import Vue from 'vue';
import Router from 'vue-router';


import Login from '@/views/back/Login';
import Dashboard from '@/components/back/Dashboard';
import Products from '@/views/back/Products';
import OrderList from '@/views/back/OrderList';
import Coupon from '@/views/back/Coupon';
import CustomerOrder from '@/views/back/CostomerOrders';
import CustomerCheckout from '@/views/back/CustomerCheckout';

import FrontEnd from '@/components/front/FrontEnd';
import FrontHome from '@/views/front/FrontHome';
import FrontProducts from '@/views/front/FrontProducts';
import FrontShoppingCart from '@/views/front/FrontShoppingCart';
import FrontOrderList from '@/views/front/FrontOrderList';
import FrontCheckout from '@/views/front/FrontCheckout';
import FrontCheckOrder from '@/views/front/FrontCheckOrder';
import FrontCartItems from '@/views/front/FrontCartItems';
import testPage from '@/views/front/testPage';
import FrontSingleProduct from '@/views/front/frontSingleProduct';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '*',
    //   redirect: '/login',
    // },

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
        {
          path: 'frontProducts/:categoryFilter',
          name: 'FrontProducts',
          component: FrontProducts,
        },

        {
          path: 'front_single_product/:productID',
          name: 'FrontSingleProduct',
          component: FrontSingleProduct,
        },


        {
          path: 'shopping_cart',
          name: 'shoppingCart',
          component: FrontShoppingCart,
          children: [
            {
              path: 'front_cart_items',
              name: 'FrontCartItems',
              component: FrontCartItems,
            },
            {
              path: 'front_orderlist',
              name: 'FrontOrderList',
              component: FrontOrderList,
            },
            {
              path: 'front_checkout/:orderId',
              name: 'FrontCheckout',
              component: FrontCheckout,
            },

          ]
        },
        
        {
          path: 'test_page',
          name: 'testPage',
          component: testPage,
        },

        {
          path: 'Front_check_order',
          name: 'FrontCheckOrder',
          component: FrontCheckOrder,
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
