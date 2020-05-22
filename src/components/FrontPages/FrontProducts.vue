<template>
  <div>
    <!-- vue-loading-overlay -->
    <loading :active.sync="isLoading"></loading>

    <div>
      <img src="@/assets/img/G14.png" />
    </div>

    <div class="row mt-4 mx-2">
      <FrontSidebar
        ref="frontSidebarComponent"
        :cateFilter="categoryFilter"
        :prodFilter="productsFilter"
        @filterUpdate="updateProductsFilter"
      ></FrontSidebar>

      <div class="col-md-10">
        <!-- BS card -->
        <div class="row">
          <div class="col-md-3 mb-4" v-for="(item, index) in productsFilterList" :key="index">
            <div class="card border-0 shadow-sm">
              <div
                style="height: 150px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}"
              ></div>
              <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">{{item.content}}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                  <!-- <div class="h5">2,800 元</div> -->
                  <div class="h5" v-if="!item.price">現在只要 {{item.origin_price}} 元</div>
                  <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
                  <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
                </div>
              </div>

              <div class="card-footer d-flex">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="getProduct(item.id)"
                >
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm ml-auto"
                  @click="addToCart(item.id)"
                >
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- BS pagination -->
        <Pagination :pagination="pagination" @changePage="getProducts"></Pagination>

        <div id="paginationJS"></div>
      </div>
    </div>

    <!-- BS modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.itemAdding"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";
import FrontSidebar from "../FrontSidebar";

export default {
  components: {
    Pagination,
    FrontSidebar
  },

  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: "",
        itemAdding: false
      },
      pagination: {},
      pgnation: {
        current_page: 1,
        has_next: false,
        has_pre: false,
        total_pages: 1
      },
      shoppingCart: [],
      couponCode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },

      categoryFilter: "",
      productsFilter: [],
      productsInWindow: [],
    };
  },

  methods: {
    getProducts(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },

    getAllProducts() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      //console.log("getAllProduct active");

      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },

    //Single product
    getProduct(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;

      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.product = response.data.product;
        $("#productModal").modal("show");
        vm.status.loadingItem = "";
      });
    },

    addToCart(id, qty = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      vm.status.itemAdding = true;
      const cart = {
        product_id: id,
        qty
      };

      this.$http.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          //console.log(response.data);
          vm.status.itemAdding = false;
          vm.getCart();
          $("#productModal").modal("hide");
        } else {
          console.log("fail to add item to cart");
          vm.status.itemAdding = false;
          $("#productModal").modal("hide");
        }
      });
    },

    getCart() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.isLoading = false;
        vm.shoppingCart = response.data.data;
      });
    },

    activatedProductFilterList() {
      const vm = this;
      return vm.products.filter(function(item) {
        return item.is_enabled;
      });
    },

    categoryFilterList() {
      const vm = this;
      let tempProducts = vm.activatedProductFilterList();
      vm.categoryFilter = vm.$route.params.categoryFilter;
      if (vm.categoryFilter == "all") {
        return tempProducts;
      } else {
        return tempProducts.filter(function(item) {
          return item.category.indexOf(vm.categoryFilter) !== -1;
        });
      }
    },

    clearProductsFilter() {
      const vm = this;
      vm.productsFilter = []; //應該不需要，side watch會清空
      vm.$refs.frontSidebarComponent.clearProdsFilter(); //刪除Sidebar內部的filter
      vm.pgnationCounter(vm.productsInWindow);
      console.log("clearProductFilter active");
    },

    updateProductsFilter(prodsFilter) {
      //console.log('FP update active');
      //console.log('prodsFilter', prodsFilter);
      const vm = this;
      vm.productsFilter = prodsFilter; //prodsFilter為FrontSidebar傳入值
    },

    pgnationCounter(productsInWindow) {
      const vm = this;
      const pageSize = 10;
      let productsLength = productsInWindow.length;
      console.log("productsLength", productsLength);
      vm.pgnation.current_page = 1;
      if (productsLength / pageSize > 1) {
        vm.pgnation.total_pages = Math.floor(productsLength / pageSize) + 1;
      }

      if (vm.pgnation.current_page < vm.pgnation.total_pages) {
        vm.pgnation.has_next = true;
      } else {
        vm.pgnation.has_next = false;
      }

      if (vm.pgnation.current_page > 1) {
        vm.pagination.has_pre = true;
      } else {
        vm.pagination.has_pre = false;
      }
    }
  },

  computed: {
    productsFilterList() {
      const vm = this;
      let tempProducts = vm.categoryFilterList();
      if (vm.productsFilter.length === 0) {
        vm.productsInWindow = tempProducts;
        return tempProducts;
      } else {
        for (let filter of vm.productsFilter) {
          tempProducts = tempProducts.filter(function(item) {
            return item.category.indexOf(filter) !== -1;
          });
        }
        vm.pgnationCounter(tempProducts);
        return tempProducts;
      }
    }
  },

  created() {
    const vm = this;
    //this.getProducts();
    this.getAllProducts();
    this.getCart();
    this.pgnationCounter(vm.productsInWindow);

    vm.$bus.$on("refreshProducts", () => {
      vm.$nextTick(() => {
        vm.clearProductsFilter();
        //console.log('refreshProducts > next > clearProductsFilter active');
      });
      
    });
    //console.log('front product clear active');
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>