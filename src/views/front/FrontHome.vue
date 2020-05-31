<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <FrontSlideshow class="mb-2"></FrontSlideshow>
    <FrontHomeMidBanner class="mb-2"></FrontHomeMidBanner>
    <FrontHomeHero></FrontHomeHero>

  </div>
</template>

<script>
import FrontSlideshow from "./FrontSlideshow";
import FrontHomeMidBanner from "./FrontHomeMidBanner";
import FrontHomeHero from "./FrontHomeHero";

export default {
  components: {
    FrontSlideshow,
    FrontHomeMidBanner,
    FrontHomeHero
  },

  data() {
    return {
      isLoading: false,
      products: {}
    };
  },

  methods: {
    getProducts() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    }
  },

  created() {
    this.getProducts();
  }
};
</script>