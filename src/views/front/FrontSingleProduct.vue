<template>
  <div class="fsp-container-fluid">
    <!-- vue-loading-overlay -->
    <loading :active.sync="isLoading"></loading>

    <div class="product-header">
      <div class="row mb-3 justify-content-center">
        <div class="product-img col-12 col-md-6">
          <img :src="product.imageUrl" class alt />
        </div>

        <div class="product-info col-12 col-md-6">
          <div class="product-title">
            <h2>{{product.title}}</h2>
          </div>

          <div class="product-price d-flex justify-content-between align-items-baseline">
            <div class="h4 text-danger" v-if="!product.price">折扣價 {{product.origin_price}} 元</div>
            <del class="h5" v-if="product.price">原價 {{product.origin_price}} 元</del>
            <div class="h4 text-danger" v-if="product.price">折扣價 {{product.price}} 元</div>
          </div>

          <pre class="product-content">{{product.content}}</pre>

          <div class="product-input">
            <div class="quantity">
              <span class="quantity-title">數量</span>
              <button class="btn btn-outline-secondary" @click="quantitySub(product)">-</button>
              <input type="text" :value="product.num" readonly="readonly" />
              <button class="btn btn-outline-secondary" @click="quantityPlus(product)">+</button>
            </div>

            <div class="buy-option">
              <button
                type="button"
                class="btn btn-outline-info"
                @click="addToCart(product.id, true, product.num)"
              >直接購買</button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id, false, product.num)"
              >加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-description">
      <div class="row mb-3">
        <div class="description-title col-12">
          <h3>商品詳情</h3>
        </div>

        <div class="col-12">
          <pre>{{product.description}}</pre>
        </div>
      </div>
    </div>

    <div class="recommand-products">
      <div class="row p-4 mb-3">
        <div class="recommand-title mb-2 col-12">
          <h5>也許您同樣也會喜歡...</h5>
        </div>
        
        <div class="col-6 col-md-3 col-12 mb-4" v-for="(item, index) in sessionStorageProducts" :key="index">
          <div class="card border-0 shadow-sm">
            <div
              style="height: 200px; background-size: contain; background-repeat: no-repeat; background-position: center;"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
            ></div>
            <div class="card-body">
              <h6 class="card-title">{{item.title}}</h6>
            </div>

            <div class="card-footer d-flex justify-content-end">
              <div class="h6" v-if="!item.price">{{item.origin_price}} 元</div>
              <div class="h6" v-if="item.price">{{item.price}} 元</div>
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
      isLoading: false,
      productId: "",
      recommandProducts: [],
      sessionStorageProducts: [],
      product: {
        num: 1
      },
      status: {
        itemAdding: false
      }
    };
  },

  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${vm.productId}`;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.product = response.data.product;
          //vm.product.num = 1;
          vm.$set(vm.product, "num", 1);

          vm.isLoading = false;
          //console.log(vm.product);
        }
      });
      //console.log("create pdn", vm.product.num);
    },

    addToCart(id, direct, qty = 1) {
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
          console.log("direct", direct);
          vm.status.itemAdding = false;
          vm.product.num = 1;

          if (direct == true) {
            vm.$router.push(`../shopping_cart/front_cart_items`);
          }
        } else {
          console.log("fail to add item to cart");
          vm.status.itemAdding = false;
        }
      });
    },

    quantitySub(product) {
      const vm = this;
      if (vm.product.num > 1) {
        vm.product.num--;
      }
      console.log("vm.product.num", vm.product.num);
    },

    quantityPlus(product) {
      const vm = this;
      if (vm.product.num < 5) {
        vm.product.num++;
      }
      console.log("vm.product.num", vm.product.num);
    }
  },

  created() {
    const vm = this;
    this.productId = this.$route.params.productID;
    this.getProduct();

    vm.$bus.$on("getRandomProds", randomProducts => {
      vm.recommandProducts = randomProducts;
      console.log("recommandProducts", vm.recommandProducts);
    });

    vm.sessionStorageProducts = JSON.parse(sessionStorage.getItem("rndProds"));
  }
};
</script>