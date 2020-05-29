<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <!-- <a class="navbar-brand" href="#">VueComputerParts</a> -->
    <router-link class="navbar-brand" to="/home">VueComputerParts</router-link>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <!-- <router-link class="nav-link" to="/home">Home</router-link> -->
          <!-- <span class="sr-only">(current)</span> -->
        </li>
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

      <ul class="navbar-nav ml-3">
        <li class="nav-item">
          <router-link
            class="btn btn-outline-info mr-2"
            to="/shopping_cart/front_cart_items"
          >ShoppingCart</router-link>
          <a class="btn btn-outline-danger" href="#" v-if="is_login" @click="signOut">Sign out</a>
          <router-link class="btn btn-outline-primary" to="/login" v-else>Sign in</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
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
