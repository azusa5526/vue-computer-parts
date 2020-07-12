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

    <div class="emptyCart-wrap" v-else>
      <h4>SHOPPING CART IS EMPTY</h4>
      <router-link class="btn btn-primary shopping-link" to="/frontProducts/all">SHOPPING NOW!</router-link>
      <img src="@/assets/img/emptyCart.png" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      status: {
        cartHasItem: false
      },
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
    getCart() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        vm.shoppingCart = response.data.data;

        if (vm.shoppingCart.carts.length == 0) {
          vm.status.cartHasItem = false;
        } else {
          vm.status.cartHasItem = true;
        }
        vm.isLoading = false;
      });
    }
  },

  computed: {
    activedPage() {
      return this.$route.name;
    }
  },

  created() {
    this.getCart();
  }
};
</script>