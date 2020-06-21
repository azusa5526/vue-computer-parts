<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link class="navbar-brand" to="/home">VueComputerParts</router-link>
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
          <router-link class="nav-link" to="/frontProducts/all">All Products</router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown01"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Products</a>
          <div class="dropdown-menu" aria-labelledby="dropdown01">
            <router-link class="dropdown-item" to="/frontProducts/cpu">CPU</router-link>
            <router-link class="dropdown-item" to="/frontProducts/motherboard">Motherboard</router-link>
            <router-link class="dropdown-item" to="/frontProducts/ram">RAM</router-link>
            <router-link class="dropdown-item" to="/frontProducts/graphic_card">Graphic Card</router-link>
            <router-link class="dropdown-item" to="/frontProducts/psu">PSU</router-link>
            <router-link class="dropdown-item" to="/frontProducts/case">Case</router-link>
          </div>
        </li>
      </ul>

      <ul class="navbar-nav align-items-center ml-3">
        <li class="nav-item">
          <router-link
            class="btn btn-outline-info mr-2"
            to="/shopping_cart/front_cart_items"
            style="width:120px;"
          >
            Cart
            <i class="fas fa-shopping-cart ml-2"></i>
          </router-link>
          <a class="btn btn-outline-danger" href="#" v-if="is_login" @click="signOut">
            Sign out
            <i class="fas fa-sign-out-alt ml-2"></i>
          </a>
          <router-link class="btn btn-outline-gray" to="/login" v-else>
            Sign in
            <i class="fas fa-sign-in-alt ml-2"></i>
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
          vm.$router.push("/login");
        }
      });
    }
  },

  created() {
    this.checkLoginStatus();
  }
};
</script>
