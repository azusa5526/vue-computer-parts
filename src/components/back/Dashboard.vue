<template>
  <div>
    <Navbar></Navbar>
    <div class="container-fluid">
      <main class="main">
        <div class="dashboard-content-wrap">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default {
  components: {
    Sidebar,
    Navbar
  }
};
</script>