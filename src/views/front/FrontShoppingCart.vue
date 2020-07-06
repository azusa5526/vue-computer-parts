<template>
  <div class="row justify-content-center">
    <loading :active.sync="isLoading"></loading>

    <div class="container mt-4" v-if="status.cartHasItem">
      <div class="cart-wrap">
        <div class="shopping-step mb-4">
          <div class="step" :class="{'active-step' : activedPage == 'FrontCartItems'}">
            <h5>CHECK CART</h5>
          </div>
          <div class="step" :class="{'active-step' : activedPage == 'FrontOrderList'}">
            <h5>FILL INFO</h5>
          </div>
          <div class="step" :class="{'active-step' : activedPage == 'FrontCheckout'}">
            <h5>PAYMENT LIST</h5>
          </div>
        </div>

        <router-view></router-view>
        
      </div>
    </div>

    <div class="my-4 emptyCart-wrap" v-else>
      <h3 class="mb-4">SHOPPING CART IS EMPTY</h3>
      <img src="@/assets/img/emptyCart.png" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
//import Pagination from "../Pagination";

export default {
  components: {
    //Pagination,
  },

  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: "",
        itemAdding: false,
        cartHasItem: false,
        topProgress: ""
      },
      pagination: {},
      shoppingCart: [],
      couponCode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      activePage: this.$route.name
    };
  },

  methods: {
    getProducts(page = 1) {
      //default page 1
      //console.log(process.env.API_PATH, process.env.CUSTOM_PATH);
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },

    //Single product
    // getProduct(id) {
    //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
    //   const vm = this;
    //   vm.status.loadingItem = id;

    //   this.$http.get(api).then(response => {
    //     console.log(response.data);
    //     vm.product = response.data.product;
    //     $("#productModal").modal("show");
    //     vm.status.loadingItem = "";
    //   });
    // },

    // addToCart(id, qty = 1) {
    //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
    //   const vm = this;
    //   vm.status.itemAdding = true;
    //   const cart = {
    //     product_id: id,
    //     qty
    //   };

    //   this.$http.post(api, { data: cart }).then(response => {
    //     if (response.data.success) {
    //       console.log(response.data);
    //       vm.status.itemAdding = false;
    //       vm.getCart();
    //       $("#productModal").modal("hide");
    //     } else {
    //       console.log("fail to add item to cart");
    //       vm.status.itemAdding = false;
    //       $("#productModal").modal("hide");
    //     }
    //   });
    // },

    removeCartItem(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.delete(api).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.getCart();
          vm.isLoading = false;
        } else {
          console.log("fail to delete item to cart");
          vm.isLoading = false;
        }
      });
    },

    addCouponCode() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.couponCode
      };
      vm.isLoading = true;

      this.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.getCart();
          vm.isLoading = false;
        } else {
          console.log(response.data);
          vm.isLoading = false;
        }
      });
    },

    getCart() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.shoppingCart = response.data.data;

        if (vm.shoppingCart.carts.length == 0) {
          vm.status.cartHasItem = false;
        } else {
          vm.status.cartHasItem = true;
        }
        vm.isLoading = false;
      });
    },

    onResize() {
      const vm = this;
      if (window.innerWidth < 768) {
        vm.imageDisplay = false;
      } else {
        vm.imageDisplay = true;
      }
    }

    // createOrder() {
    //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
    //   const vm = this;
    //   const order = vm.form;
    //   vm.isLoading = true;

    //   this.$validator.validate().then(valid => {
    //     if (valid) {
    //       this.$http.post(api, { data: order }).then(response => {
    //         console.log(response.data, "訂單已建立");
    //         if (response.data.success) {
    //           vm.$router.push(`/front_checkout/${response.data.orderId}`);
    //         }
    //         //vm.getCart();
    //         vm.isLoading = false;
    //       });
    //     } else {
    //       console.log("尚有欄位未填寫");
    //       vm.isLoading = false;
    //     }
    //   });
    // }
  },

  computed: {
    activedPage() {
      const vm = this;
      return this.$route.name;
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>