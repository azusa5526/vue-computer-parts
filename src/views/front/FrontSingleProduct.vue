<template>
  <div class="fsp-container-fluid">
    <loading :active.sync="isLoading"></loading>

    <div class="product-header">
      <div class="row my-3 justify-content-center">
        <div class="product-wrap col-12 col-md-6">
          <div class="product-img" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
        </div>

        <div class="product-info col-12 col-md-6">
          <div class="product-title">
            <h2>{{product.title}}</h2>
          </div>

          <div class="product-price d-flex justify-content-between align-items-baseline">
            <div class="h4 text-danger" v-if="!product.price">$ {{product.origin_price}} 元</div>
            <del class="h5" v-if="product.price">$ {{product.origin_price}}</del>
            <div class="h4 text-danger mr-2" v-if="product.price">$ {{product.price}}</div>
          </div>

          <pre class="product-content">{{product.content}}</pre>

          <div class="product-input">
            <div class="quantity">
              <span class="quantity-title">QUANTITY</span>
              <button class="btn btn-outline-third" @click="quantitySub(product)">-</button>
              <input type="text" :value="product.num" readonly="readonly" />
              <button class="btn btn-outline-third" @click="quantityPlus(product)">+</button>
            </div>

            <div class="buy-option">
              <button
                type="button"
                class="btn btn-outline-primary mr-1percent"
                @click="addToCart(product.id, true, product.num)"
              >
                <i class="fas fa-circle-notch fa-spin" v-if="clickedButton == 'direct'"></i> BUY NOW
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id, false, product.num)"
              >
                <i class="fas fa-circle-notch fa-spin" v-if="clickedButton == 'non-direct'"></i> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-description">
      <div class="row mb-3">
        <div class="description-title col-12">
          <h3>PRODUCT INFO</h3>
        </div>

        <div class="col-12">
          <pre>{{product.description}}</pre>
        </div>
      </div>
    </div>

    <div class="recommand-products">
      <div class="row mb-3">
        <div class="recommand-title my-2 col-12">
          <h5>MAYBE YOU WILL LIKE...</h5>
        </div>

        <div
          class="col-md-3 col-sm-6 col-12 mb-4 recommand-hover"
          v-for="(item, index) in recommandProducts"
          :key="index"
        >
          <a
            class="link-block"
            :href="'#/front_single_product/' + item.id"
            @click="getRecommandProduct(item.id)"
          >
            <div class="card shadow-sm">
              <div
                style="height: 200px; background-size: contain; background-repeat: no-repeat; background-position: center;"
                :style="{backgroundImage: `url(${item.imageUrl})`}"
              ></div>
              <div class="card-body">
                <h6 class="card-title">{{item.title}}</h6>
              </div>

              <div class="card-footer d-flex justify-content-end">
                <div class="h6" v-if="!item.price">$ {{item.origin_price}}</div>
                <div class="h6" v-if="item.price">$ {{item.price}}</div>
              </div>
            </div>
          </a>
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
      localCateProducts: [],
      product: {
        num: 1
      },
      clickedButton: "",
      shoppingCart: []
    };
  },

  watch: {
    $route(to, from) {
      this.productId = this.$route.params.productID;
      this.getSingleProduct();
    }
  },

  methods: {
    getSingleProduct() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${vm.productId}`;
      vm.isLoading = true;
      vm.randomProduct(vm.localCateProducts, 4);

      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.product = response.data.product;
          vm.$set(vm.product, "num", 1);
          vm.isLoading = false;
        }
      });
    },

    getRecommandProduct(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      const vm = this;

      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(
            `../front_single_product/${response.data.product.id}`
          );
        }
      });
    },

    getCart() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.shoppingCart = response.data.data;
      });
    },

    addToCart(id, direct, qty = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };

      if (direct) {
        vm.clickedButton = "direct";
      } else {
        vm.clickedButton = "non-direct";
      }

      vm.shoppingCart.carts.filter(function(item) {
        if (item.product.id == cart.product_id) {
          cart.qty = item.qty + cart.qty;
          vm.removeCartItem(item.id);
          vm.getCart();
        }
      });

      this.$http.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          vm.getCart();
          vm.$bus.$emit(
            "message:push",
            "Successfully add to cart",
            "secondary"
          );
          (vm.clickedButton = ""), (vm.product.num = 1);

          if (direct) {
            vm.$router.push(`../shopping_cart/front_cart_items`);
          }
        } else {
          vm.$bus.$emit("message:push", "Fail to add to cart", "third");
          vm.clickedButton = "";
        }
      });
    },

    removeCartItem(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
        }
      });
    },

    quantitySub(product) {
      const vm = this;
      if (vm.product.num > 1) {
        vm.product.num--;
      }
    },

    quantityPlus(product) {
      const vm = this;
      if (vm.product.num < 5) {
        vm.product.num++;
      }
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

      this.recommandProducts = newArr;
    }
  },

  created() {
    const vm = this;
    this.productId = this.$route.params.productID;
    vm.localCateProducts = JSON.parse(localStorage.getItem("cateFilteredList"));

    this.getSingleProduct();
    this.getCart();


    //this.getTestProduct();
  }
};
</script>