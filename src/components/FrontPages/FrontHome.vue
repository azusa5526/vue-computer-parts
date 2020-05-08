<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <FrontSlideshow></FrontSlideshow>

    <div class="mt-4">
      <div class="row">
        <div class="col-md-3">
          <div class="card" style="width: 25rem;">
            <img class="card-img-top" src="@/assets/img/ryzen.png" alt="Card image cap" />
            <div class="card-body">
              <p
                class="card-text"
              >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
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