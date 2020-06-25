<template>
  <div>
    <!-- vue-loading-overlay -->
    <loading :active.sync="isLoading"></loading>
    <FrontSlidesProducts></FrontSlidesProducts>

    <div class="row mt-4   justify-content-center">
      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-12">
        <FrontSidebar
          ref="frontSidebarComponent"
          :cateFilter="categoryFilter"
          :prodFilter="productsFilter"
          @filterUpdate="updateProductsFilter"
        ></FrontSidebar>
      </div>

      <div id="product-wrap" class="col-xl-10 col-lg-9 col-md-9 col-sm-12 col-12">
        <!-- BS card -->
        <div class="row">
          <div
            class="col-2xl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4 product-hover card-wrap"
            v-for="(item, index) in productsInWindowList"
            :key="index"
          >
            <a
              class="link-block"
              :href="'#/front_single_product/' + item.id"
              @click="getProduct(item.id)"
            >
              <div class="card border-0 shadow-sm">
                <div
                  style="height: 300px; background-size: contain; background-position: center; background-repeat: no-repeat; background-color: #FFFFFF;"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                ></div>
                <div class="card-body">
                  <!-- <span class="badge badge-secondary float-right ml-2">{{item.category}}</span> -->
                  <h5 class="card-title">{{item.title}}</h5>
                  <p class="card-text">{{item.content}}</p>
                  <!-- <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">現在只要 {{item.origin_price}} 元</div>
                    <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
                    <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
                  </div>-->
                </div>

                <div class="card-footer d-flex justify-content-between align-items-baseline">
                  <div class="h5" v-if="!item.price">現在只要 {{item.origin_price}} 元</div>
                  <del class="h6" v-if="item.price">{{item.origin_price}} 元</del>
                  <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
                </div>

                <!-- <div class="card-footer d-flex">
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
                </div>-->
              </div>
            </a>
          </div>
        </div>

        <div class="row justify-content-center">
          <Pgnation
            v-if="filteredProducts.length !== 0"
            class="mt-4"
            :pagination="pgnation"
            @changePage="changeCurrentPage"
          ></Pgnation>
        </div>
      </div>

      <!-- <div class="no-product-found col-xl-10 col-lg-9 col-md-9 col-sm-12 col-11" v-if="filteredProducts.length == 0">
        <h4>No products found</h4>
      </div>-->
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
              <div class="h4" v-if="!product.price">折扣價 {{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">折扣價 {{ product.price }} 元</div>
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
import FrontSidebar from "@/components/front/FrontSidebar";
import Pgnation from "@/components/front/Pgnation";
import FrontSlidesProducts from "./FrontSlidesProducts";

export default {
  components: {
    FrontSidebar,
    Pgnation,
    FrontSlidesProducts
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
        total_pages: 1,
        page_size: 10
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
      filteredProducts: [],
      productsInWindow: [],
      categoryFilteredList: [],
      tempRandomProducts: []
    };
  },

  methods: {
    // getProducts(page = 1) {
    //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
    //   const vm = this;
    //   vm.isLoading = true;

    //   this.$http.get(api).then(response => {
    //     //console.log(response.data);
    //     vm.isLoading = false;
    //     vm.products = response.data.products;
    //     vm.pagination = response.data.pagination;
    //   });
    // },

    getAllProducts() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
      const vm = this;
      vm.isLoading = true;

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
      vm.randomProduct(vm.categoryFilteredList, 4);

      this.$http.get(api).then(response => {
        //console.log(response.data);
        if (response.data.success) {
          vm.$router.push(
            `../front_single_product/${response.data.product.id}`
          );

          sessionStorage.setItem("rndProds", JSON.stringify(vm.tempRandomProducts));
          vm.$bus.$emit("getRandomProds", vm.tempRandomProducts);
        }
      });
    },

    randomProduct(arr, num) {
      let newArr = [];
      if (arr.length <= num) {
        num = arr.length;
      }

      rand(num);

      function rand(selectQty) {
        if (selectQty == 0) {
          return;
        }

        let index = Math.floor(Math.random() * arr.length);
        let flag = true;

        newArr.forEach(function(item) {
          if (item == arr[index]) {
            flag = false;
          }
        });

        if (flag) {
          newArr.push(arr[index]);
          selectQty--;
        }
        rand(selectQty);
      }

      this.tempRandomProducts = newArr;
      //return newArr;
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

    productsFilterList() {
      const vm = this;
      let tempProducts = vm.categoryFilterList();
      vm.categoryFilteredList = tempProducts; //待移位

      if (vm.productsFilter.length === 0) {
        return tempProducts;
      } else {
        for (let filter of vm.productsFilter) {
          tempProducts = tempProducts.filter(function(item) {
            return item.category.indexOf(filter) !== -1;
          });
        }
        return tempProducts;
      }
    },

    updateProductsFilter(prodsFilter) {
      //console.log('FP update active');
      //console.log('prodsFilter', prodsFilter);
      const vm = this;
      vm.productsFilter = prodsFilter; //prodsFilter為FrontSidebar傳入值
    },

    pgnationCounter() {
      const vm = this;
      let productsLength = vm.filteredProducts.length;
      //console.log("productsLength", productsLength);

      vm.pgnation.total_pages = Number(
        Math.floor(productsLength / vm.pgnation.page_size) + 1
      );
      //console.log(Number(Math.floor(productsLength / pageSize) + 1))
      //vm.pgnation.current_page = 1;

      if (vm.pgnation.current_page < vm.pgnation.total_pages) {
        vm.pgnation.has_next = true;
      } else {
        vm.pgnation.has_next = false;
      }

      if (vm.pgnation.current_page > 1) {
        vm.pgnation.has_pre = true;
      } else {
        vm.pgnation.has_pre = false;
      }
    },

    pageSpliter() {
      const vm = this;
      let pageMinIndex =
        vm.pgnation.current_page * vm.pgnation.page_size -
        vm.pgnation.page_size +
        1;
      let pageMaxIndex = vm.pgnation.current_page * vm.pgnation.page_size;
      //console.log("pageMinIndex", pageMinIndex);
      //console.log("pageMaxIndex", pageMaxIndex);

      vm.productsInWindow = [];
      vm.filteredProducts.forEach(function(item, index) {
        const num = index + 1;
        if (num >= pageMinIndex && num <= pageMaxIndex) {
          vm.productsInWindow.push(item);
        }
      });
    },

    changeCurrentPage(targetPage) {
      const vm = this;
      //console.log("targetPage", targetPage);
      vm.pgnation.current_page = Number(targetPage);
      //console.log("vm.pgnation.current_page", vm.pgnation.current_page);
      vm.pgnationCounter();
      vm.pageSpliter();
    }
  },

  computed: {
    productsInWindowList() {
      const vm = this;
      let productsInWindow = [];
      let tempProducts = []; 

      vm.filteredProducts = vm.productsFilterList();
      //console.log('filteredProducts',vm.filteredProducts);

      let pageMinIndex =
        vm.pgnation.current_page * vm.pgnation.page_size -
        vm.pgnation.page_size +
        1;
      let pageMaxIndex = vm.pgnation.current_page * vm.pgnation.page_size;
      //console.log("pageMinIndex", pageMinIndex);
      //console.log("pageMaxIndex", pageMaxIndex);

      vm.filteredProducts.forEach(function(item, index) {
        const num = index + 1;
        if (num >= pageMinIndex && num <= pageMaxIndex) {
          productsInWindow.push(item);
        }
      });
      vm.pgnationCounter();
      vm.pageSpliter();
      return productsInWindow;
    }
  },

  watch: {
    categoryFilter: {
      handler() {
        //console.log('categoryFilter change to: ', this.categoryFilter);
        this.pgnation.current_page = 1;
      }
    }
  },

  created() {
    this.getAllProducts();
    this.pgnationCounter();
    this.pageSpliter();
    this.getCart();
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>