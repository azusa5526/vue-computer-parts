<template>
  <div>
    <FrontNavbar></FrontNavbar>

    <div class="container-fluid px-0" style="padding-top: 3.99rem;">
      <main>
        <router-view></router-view>
      </main>
      
      <footer class="container">
        <hr />
        <p>&copy; Company 2017-2019</p>
      </footer>
    </div>
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



</style>