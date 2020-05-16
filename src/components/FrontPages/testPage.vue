<template>
  <div>

    <input type="checkbox" id="cpu" value="cpu" v-model="sideFilter" />
    <label for="cpu">cpu</label>
    <input type="checkbox" id="intel" value="intel" v-model="sideFilter" />
    <label for="intel">intel</label>

    <div class="row">
      <div class="col-md-3 mb-4" v-for="(item, index) in sideFilterList" :key="index">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <div class="h5" v-if="!item.price">現在只要 {{item.origin_price}} 元</div>
              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideFilter: [],
      products: []
    };
  },

  methods: {
    getProducts(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      const vm = this;
      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.products = response.data.products;
      });
    }
  },

  computed: {
    sideFilterList() {
      const vm = this;
      let tempProducts = [];

      if (vm.sideFilter.length === 0) {
        return vm.products;
      } else {
        for (let rule of vm.sideFilter) {
          tempProducts = tempProducts.concat(
            vm.products.filter(function(item) {
              return item.category.indexOf(rule) !== -1;
            })
          );
        }
      }
      return tempProducts;
    }
  },

  created() {
    this.getProducts();
  }
};
</script>