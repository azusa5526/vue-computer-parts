<template>
  <div id="app">
    <AllertMessage></AllertMessage>
    <router-view/>

  </div>
</template>

<script>
import AllertMessage from "../src/components/front/AllertMessage";

export default {
  name: 'App',

  components: {
    AllertMessage,
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/all.scss";
</style>
