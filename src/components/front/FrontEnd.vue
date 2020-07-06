<template>
  <div>
    <FrontNavbar></FrontNavbar>

    <div class="container-fluid px-0">
      <main class="main">
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

export default {
  components: {
    FrontNavbar,
    FrontSidebar,
    FrontFooter,
  },

  data() {
    return {};
  },
};
</script>