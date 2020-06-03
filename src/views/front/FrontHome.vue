<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <FrontSlideshow class="mb-2"></FrontSlideshow>

    <div class="mid-banner mb-2">
      <h6>mid banner text</h6>
    </div>

    <div id="heroProducts">
      <div class="row mb-2">
        <div class="hero-col-4">
          <div class="card">
            <img src="@/assets/img/mb.png" class="card-img" />
            <div class="card-header card-img-overlay">
              <h3>Card header</h3>
              <p>This is a wider card with supporting text below</p>
            </div>
          </div>
        </div>

        <div class="hero-col-4">
          <div class="card">
            <img src="@/assets/img/mb.png" class="card-img" />
            <div class="card-header card-img-overlay">
              <h3>Card header</h3>
              <p>This is a wider card with supporting text below</p>
            </div>
          </div>
        </div>

        <div class="hero-col-4">
          <div class="card">
            <img src="@/assets/img/mb.png" class="card-img" />
            <div class="card-header card-img-overlay">
              <h3>Card header</h3>
              <p>This is a wider card with supporting text below</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="build-pc">
      <div class="row mb-2">
        <div class="col-6">
          <div class="build-pc-text">
            <h5>Why don't you Build your PC now ?</h5>
            <p>Building your own PC might sound intimidating — but if you're a gamer, we know the thought has crossed your mind at least once. After all, a custom-built gaming rig is the only surefire way to get exactly what you want, exactly the way you want it.</p>
          </div>
        </div>

        <div class="col-6">
          <img src="@/assets/img/pc.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FrontSlideshow from "./FrontSlideshow";


export default {
  components: {
    FrontSlideshow,
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