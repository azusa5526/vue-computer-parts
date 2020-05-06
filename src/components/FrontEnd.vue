<template>
  <div>
    <FrontNavbar></FrontNavbar>

    <main role="main">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">Hello, world!</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p>
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a>
          </p>
        </div>
      </div>

      <div class="container">
          <router-view></router-view>
      </div>

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