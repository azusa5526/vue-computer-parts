<template>
  <div>
    <div class="login-wrap">
      <form class="login" @submit.prevent="signin">
        <div class="login-img">
          <h1><i class="fab fa-vuejs"></i>CP.com</h1>
        </div>

        <div class="login-content">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control mb-3"
            v-model="user.username"
            placeholder="Email address"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword "
            class="form-control mb-3"
            v-model="user.password"
            placeholder="Password"
            required
          />
          <div class="checkbox mb-3">
            <label class="remember-text">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit"><i class="fas fa-circle-notch fa-spin" v-if="isLoading"></i> Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      isLoading: false
    };
  },
  methods: {
    signin() {
      const api = `${process.env.API_PATH}/admin/signin`;
      const vm = this;
      vm.isLoading = true;

      this.$http.post(api, vm.user).then(response => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.$router.push("/home");
        } else if(response.data.error.code == "auth/wrong-password") {
          vm.$bus.$emit("message:push", 'Account or password is invalid', 'third');
        }
      });
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>