<template>
  <div>
    <FrontNavbar></FrontNavbar>

    <main role="main">
      <router-view></router-view>

      <footer class="container">
        <p>&copy; Company 2017-2019</p>
      </footer>
    </main>
    
  </div>
</template>

<script >
import FrontNavbar from "./FrontNavbar";
import FrontSidebar from "./FrontSidebar";

export default {
  components: {
    FrontNavbar,
    FrontSidebar
  },

  data() {
    return {};
  },

  methods: {}
};
</script>

<style scoped>
body {
  padding-top: 3.5rem;
}
</style>