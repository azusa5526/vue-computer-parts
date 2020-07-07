<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top">
    <router-link class="navbar-logo" to="/home">
      <span>
        <i class="fab fa-vuejs"></i>CP.com
      </span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav align-items-center mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/Front_check_order">Check Order</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/frontProducts/all">Products</router-link>
        </li>
      </ul>

      <ul class="navbar-nav align-items-center ml-3">
        <li class="nav-item">
          <router-link
            class="btn btn-outline-primary mr-2"
            to="/shopping_cart/front_cart_items"
            style="width:115px;"
          >
            CART
            <i class="fas fa-shopping-cart ml-2"></i>
          </router-link>
          <a class="btn btn-outline-danger mr-2" href="#" v-if="is_login" @click="signOut">
            SIGN OUT
            <i class="fas fa-sign-out-alt ml-2"></i>
          </a>
          <router-link
            class="btn btn-outline-secondary mr-2"
            to="/login"
            style="width:115px;"
            v-else
          >
            SIGN IN
            <i class="fas fa-sign-in-alt ml-2"></i>
          </router-link>
          <router-link
            class="btn btn-outline-secondary mr-2"
            to="/admin/products"
            v-if="is_login"
          >
            <i class="fas fa-cog"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      is_login: false
    };
  },

  methods: {
    checkLoginStatus() {
      const api = `${process.env.API_PATH}/api/user/check`;
      const vm = this;

      this.$http.post(api).then(response => {
        vm.is_login = response.data.success;
      });
    },

    signOut() {
      const api = `${process.env.API_PATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        console.log("sign out", response.data);
        if (response.data.success) {
          vm.is_login = false;
          vm.$router.push("/home");
        }
      });
    }
  },

  created() {
    this.checkLoginStatus();
  }
};
</script>
