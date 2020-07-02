<template>
  <div>
    <FrontNavbar></FrontNavbar>
    <AllertMessage></AllertMessage>

    <div class="container-fluid px-0">
      <main id="main">
        <router-view></router-view>
      </main>
    </div>

    <FrontFooter class="mt-4"></FrontFooter>
  </div>
</template>

<script >
import FrontNavbar from "./FrontNavbar";
import FrontSidebar from "./FrontSidebar";
import FrontFooter from "./FrontFooter";
import AllertMessage from "./AllertMessage";

export default {
  components: {
    FrontNavbar,
    FrontSidebar,
    FrontFooter,
    AllertMessage
  },

  data() {
    return {};
  },

  methods: {}
};
</script>