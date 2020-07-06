<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
      <router-link class="navbar-logo" to="/home">
        <span>
          <i class="fab fa-vuejs"></i>CP. BACK
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
            <router-link class="nav-link" to="/admin/products">PRODUCT LIST</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order_list">ORDER LIST</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">COUPON LIST</router-link>
          </li>
        </ul>

        <ul class="navbar-nav align-items-center ml-3">
          <li class="nav-item">
            <a class="btn btn-outline-danger" href="#" v-if="is_login" @click="signOut">
              Sign out
              <i class="fas fa-sign-out-alt ml-2"></i>
            </a>
            <router-link class="btn btn-outline-secondary" to="/login" v-else>
              Sign in
              <i class="fas fa-sign-in-alt ml-2"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_login: false
    };
  },

  methods: {
    // signout() {
    //   const api = `${process.env.API_PATH}/logout`;
    //   const vm = this;
    //   this.$http.post(api).then(response => {
    //     //console.log(response.data);
    //     if (response.data.success) {
    //       vm.$router.push("/login");
    //     }
    //   });
    // },

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

