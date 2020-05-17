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
        <!-- <div class="form-group">
          <legend>產品分類</legend>
          <div>
            <input type="checkbox" id="cpu" value="cpu" v-model="productsFilter" />
            <label for="cpu">CPU</label>
          </div>
          <div>
            <input type="checkbox" id="motherboard" value="motherboard" v-model="productsFilter" />
            <label for="motherboard">Motherboard</label>
          </div>
          <div>
            <input type="checkbox" id="ram" value="ram" v-model="productsFilter" />
            <label for="ram">RAM</label>
          </div>
        </div> -->

        <!-- BS Collapse -->
        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                  <input
                    type="checkbox"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-controls="collapseOne"
                    value="cpu"
                    id="cpu"
                    v-model="productsFilter"

                  />
                  <label
                    for="cpu"
                    data-toggle="collapse"
                    data-target="#collapseOne"

                  >CPU</label>
              </h5>
            </div>

            <div
              id="collapseOne"
              class="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div>
                  <input type="checkbox" id="intel" value="intel" v-model="productsFilter" />
                  <label for="intel">intel</label>
                </div>
                <div>
                  <input type="checkbox" id="amd" value="amd" v-model="productsFilter" />
                  <label for="amd">amd</label>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <input
                    type="checkbox"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-controls="collapseTwo"
                    value="motherboard"
                    id="motherboard"
                    v-model="productsFilter"

                  />
                  <label
                    for="motherboard"
                    data-toggle="collapse"
                    data-target="#collapseTwo"

                  >Motherboard</label>
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
                  <input type="checkbox" id="asus" value="asus" v-model="productsFilter" />
                  <label for="asus">Asus</label>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >Collapsible Group Item #3</button>
              </h5>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div
                class="card-body"
              >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
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
      productsFilter: [],
    };
  },

  methods: {
    getProducts(page = 1) {
      //default page 1
      //console.log(process.env.API_PATH, process.env.CUSTOM_PATH);
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

    removeCartItem(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.delete(api).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.getCart();
          vm.isLoading = false;
        } else {
          console.log("fail to delete item to cart");
          vm.isLoading = false;
        }
      });
    },

    addCouponCode() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.couponCode
      };
      vm.isLoading = true;

      this.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.getCart();
          vm.isLoading = false;
        } else {
          console.log(response.data);
          vm.isLoading = false;
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

    createOrder() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;

      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(response => {
            console.log(response.data, "訂單已建立");
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            //vm.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log("尚有欄位未填寫");
          vm.isLoading = false;
        }
      });
    },

    categoryFilterList() {
      const vm = this;
      vm.categoryFilter = vm.$route.params.categoryFilter;
      if (vm.categoryFilter == "all") {
        return vm.products;
      } else {
        return vm.products.filter(function(item) {
          //console.log('item.category :', item.category, '  vm.categoryFilter :', vm.categoryFilter);
          //console.log(item.category.indexOf(vm.categoryFilter) !== -1);
          return item.category.indexOf(vm.categoryFilter) !== -1;
        });
      }
    },

    pushToProductsFilter(rule) {
      const vm = this;
      if (vm.productsFilter.indexOf(rule) !== -1) {
        vm.productsFilter.splice(rule, 1);
      } else {
        vm.productsFilter.push(rule);
      }
    }
  },

  computed: {
    // activatedList() {
    //   const vm = this;
    //   return vm.products.filter(function(item) {
    //     return item.is_enabled;
    //   });
    // },

    // categoryFilterList() {
    //   const vm = this;
    //   vm.categoryFilter = vm.$route.params.categoryFilter;
    //   if (vm.categoryFilter == "all") {
    //     return vm.products;
    //   } else {
    //     return vm.products.filter(function(item) {
    //       return item.category == vm.categoryFilter;
    //     });
    //   }
    // },

    productsFilterList() {
      const vm = this;
      let tempProducts = vm.categoryFilterList();
      //console.log("productFilterList before > tempProduct", vm.categoryFilterList());

      if (vm.productsFilter.length === 0) {
        return tempProducts;
      } else {
        // for (let filter of vm.productsFilter) {
        //   tempProducts = tempProducts.concat(
        //     tempProducts.filter(function(item) {
        //       return item.category.indexOf(filter) !== -1;
        //     })
        //   );
        // }
        for (let filter of vm.productsFilter) {
          tempProducts = tempProducts.filter(function(item) {
            return item.category.indexOf(filter) !== -1;
          });
        }
      }
      //console.log("productFilterList after > tempProduct", tempProducts);
      return tempProducts;
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}

/* .inner {
  display: block;
  max-width: 100%;
  height: auto;
} */
</style>