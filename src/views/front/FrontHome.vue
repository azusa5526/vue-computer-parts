<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <FrontSlideshow class="mb-2"></FrontSlideshow>

    <div class="mid-banner mb-2">
      <h6>mid banner text</h6>
    </div>

    <div id="heroProducts">
      <div class="row mb-2">
        <div class="col-lg-3 col-md-6 mb-2">
          <div class="card">
            <div class="card-header">
              <h4>STRIX B450-F GAMING12131231123131</h4>
              <p>This is a wider card</p>
            </div>
            <div
              class="card-img"
              :style="{ backgroundImage: 'url(' + require('@/assets/img/ROG.jpg') + ')' }"
            >
              <!-- <img src="@/assets/img/RAM1.png" /> -->
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-2">
          <div class="card">
            <div class="card-header">
              <h4>STRIX B450-F GAMING</h4>
              <p>This is a wider card</p>
            </div>
            <div
              class="card-img"
              :style="{ backgroundImage: 'url(' + require('@/assets/img/RAM1.png') + ')' }"
            >
              <!-- <img src="@/assets/img/mb.png" /> -->
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-2">
          <div class="card">
            <div class="card-header">
              <h4>Card header</h4>
              <p>This is a wider card</p>
            </div>
            <div
              class="card-img"
              :style="{ backgroundImage: 'url(' + require('@/assets/img/MSI_VII.png') + ')' }"
            >
              <!-- <img src="@/assets/img/mb.png" /> -->
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-2">
          <div class="card">
            <div class="card-header">
              <h4>Card header</h4>
              <p>This is a wider card</p>
            </div>
            <div class="card-img">
              <!-- <img src="@/assets/img/mb.png" /> -->
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
    FrontSlideshow
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