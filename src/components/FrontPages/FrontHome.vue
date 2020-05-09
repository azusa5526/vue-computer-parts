<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <FrontSlideshow ></FrontSlideshow>

    <div class="container-fluid">
      <div class="card-deck row mt-4">
        <div class="card">
          <img class="card-img-top" src="@/assets/img/ROG.jpg" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div class="card">
          <img class="card-img-top" src="@/assets/img/ROG.jpg" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div class="card">
          <img class="card-img-top" src="@/assets/img/ROG.jpg" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container-fluid">
      <div class="row mt-4">
        
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm text-black">
            <img class="card-img" src="@/assets/img/ROG.jpg" alt="Card image" />
          </div>
          <div class="card-img-overlay">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Last updated 3 mins ago</p>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card shadow-sm text-black">
            <img class="card-img" src="@/assets/img/mb.png" alt="Card image" />
          </div>
          <div class="card-img-overlay">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Last updated 3 mins ago</p>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card shadow-sm text-black">
            <img class="card-img" src="@/assets/img/ROG.jpg" alt="Card image" />
          </div>
          <div class="card-img-overlay">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Last updated 3 mins ago</p>
          </div>
        </div>

      </div>

      

    </div>-->

    <!-- <div class="container-fluid">
      <div class="row">
        <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
         
          <div
            class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden flex-fill"
          >
            <div class="my-3 py-3">
              <h2 class="display-5">Another headline</h2>
              <p class="lead">And an even wittier subheading.</p>
            </div>
            <div
              class="bg-light box-shadow mx-auto"
              style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
            ></div>
          </div>
         

        </div>
      </div>
    </div>-->
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