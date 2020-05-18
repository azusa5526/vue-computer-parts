<template>
  <div>
    <!-- vue-loading-overlay -->
    <loading :active.sync="isLoading"></loading>

    <div>
      <img src="@/assets/img/G14.png" />
    </div>

    <div class="row mt-4 mx-2">
      <!-- <FrontSidebar></FrontSidebar> -->

      <nav class="col-md-2 d-none d-md-block bg-light">
        <div id="accordion">
          <div class="card" v-if="categoryFilter === 'cpu'">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button
                  class="btn btn-link"
                  data-toggle="collapse"
                  data-target="#collapseCpuBrand"
                  aria-expanded="true"
                  aria-controls="collapseCpuBrand"
                >CPU Brand</button>
              </h5>
            </div>

            <div
              id="collapseCpuBrand"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div>
                  <input type="checkbox" id="intel" value="intel" v-model="productsFilter" />
                  <label for="intel">Intel</label>
                </div>
                <div>
                  <input type="checkbox" id="amd" value="amd" v-model="productsFilter" />
                  <label for="amd">AMD</label>
                </div>
              </div>
            </div>
          </div>

          <div class="card" v-if="categoryFilter === 'cpu'">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >Socket type</button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div>
                  <input
                    type="checkbox"
                    id="socket-1151"
                    value="socket-1151"
                    v-model="productsFilter"
                  />
                  <label for="socket-1151">Socket-1151</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="socket-AM4"
                    value="socket-AM4"
                    v-model="productsFilter"
                  />
                  <label for="socket-AM4">Socket-AM4</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card" v-if="categoryFilter === 'motherboard'">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseMohterboardBrand"
                aria-expanded="true"
                aria-controls="collapseMohterboardBrand"
              >Motherboard Brand</button>
            </h5>
          </div>

          <div id="collapseMohterboardBrand" class="collapse show" data-parent="#accordion">
            <div class="card-body">
              <div>
                <input type="checkbox" id="asus" value="asus" v-model="productsFilter" />
                <label for="asus">ASUS</label>
              </div>
              <div>
                <input type="checkbox" id="msi" value="msi" v-model="productsFilter" />
                <label for="msi">MSI</label>
              </div>
              <div>
                <input type="checkbox" id="asrock" value="asrock" v-model="productsFilter" />
                <label for="asrock">AsRock</label>
              </div>
            </div>
          </div>
        </div>

        <div class="card" v-if="categoryFilter === 'motherboard'">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseMotherboardSocket"
                aria-expanded="false"
                aria-controls="collapseMotherboardSocket"
              >Motherboard Socket</button>
            </h5>
          </div>
          <div id="collapseMotherboardSocket" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <div>
                <input
                  type="checkbox"
                  id="motherboardSocket-1151"
                  value="motherboardSocket-1151"
                  v-model="productsFilter"
                />
                <label for="motherboardSocket-1151">Socket-1151</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="motherboardSocket-AM4"
                  value="motherboardSocket-AM4"
                  v-model="productsFilter"
                />
                <label for="motherboardSocket-AM4">Socket-AM4</label>
              </div>
            </div>
          </div>
        </div>

        <div class="card" v-if="categoryFilter === 'ram'">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseRamBrand"
                aria-expanded="false"
                aria-controls="collapseRamBrand"
              >RAM Brand</button>
            </h5>
          </div>
          <div id="collapseRamBrand" class="collapse show" data-parent="#accordion">
            <div class="card-body">
              <div>
                <input type="checkbox" id="crucial-ram" value="crucial" v-model="productsFilter" />
                <label for="crucial-ram">Crucial</label>
              </div>
              <div>
                <input type="checkbox" id="kingston-ram" value="kingston" v-model="productsFilter" />
                <label for="kingston-ram">Kingston</label>
              </div>
            </div>
          </div>
        </div>

        <div class="card" v-if="categoryFilter === 'ram'">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseRamCapacity"
                aria-expanded="false"
                aria-controls="collapseRamCapacity"
              >RAM Capacity</button>
            </h5>
          </div>
          <div id="collapseRamCapacity" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <div>
                <input type="checkbox" id="8GB-ram" value="8GB" v-model="productsFilter" />
                <label for="8GB-ram">8 GB</label>
              </div>
              <div>
                <input type="checkbox" id="16GB-ram" value="16GB" v-model="productsFilter" />
                <label for="16GB-ram">16 GB</label>
              </div>
              <div>
                <input type="checkbox" id="32GB-ram" value="32GB" v-model="productsFilter" />
                <label for="32GB-ram">32 GB</label>
              </div>
            </div>
          </div>
        </div>

        <div class="card" v-if="categoryFilter === 'ram'">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseRamFrequency"
                aria-expanded="false"
                aria-controls="collapseRamFrequency"
              >RAM Frequency</button>
            </h5>
          </div>
          <div id="collapseRamFrequency" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <div>
                <input type="checkbox" id="1600Hz-ram" value="1600Hz" v-model="productsFilter" />
                <label for="8GB-ram">1600 Hz</label>
              </div>
              <div>
                <input type="checkbox" id="2400Hz-ram" value="2400Hz" v-model="productsFilter" />
                <label for="16GB-ram">2400 Hz</label>
              </div>
              <div>
                <input type="checkbox" id="3600Hz-ram" value="3600Hz" v-model="productsFilter" />
                <label for="3600Hz-ram">3600 Hz</label>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
      productsFilter: []
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

    //Single product
    getProduct(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;

      this.$http.get(api).then(response => {
        console.log(response.data);
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
        console.log(response.data);
        vm.isLoading = false;
        vm.shoppingCart = response.data.data;
      });
    },

    categoryFilterList() {
      const vm = this;
      vm.categoryFilter = vm.$route.params.categoryFilter;
      if (vm.categoryFilter == "all") {
        return vm.products;
      } else {
        return vm.products.filter(function(item) {
          return item.category.indexOf(vm.categoryFilter) !== -1;
        });
      }
    },

    clearProductsFilter() {
      const vm = this;
      vm.productsFilter = [];
      console.log('clearProductFilter active');
    },

  },

  computed: {
    // activatedList() {
    //   const vm = this;
    //   return vm.products.filter(function(item) {
    //     return item.is_enabled;
    //   });
    // },

    productsFilterList() {
      const vm = this;
      let tempProducts = vm.categoryFilterList();

      if (vm.productsFilter.length === 0) {
        return tempProducts;
      } else {
        for (let filter of vm.productsFilter) {
          tempProducts = tempProducts.filter(function(item) {
            return item.category.indexOf(filter) !== -1;
          });
        }
      }
      return tempProducts;
    }
  },

  created() {
    const vm = this;

    this.getProducts();
    this.getCart();

    vm.$bus.$on('clearProductFilter', () => {
      vm.clearProductsFilter();
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