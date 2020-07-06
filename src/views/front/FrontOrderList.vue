<template>
  <!-- Order list -->
  <div class="px-3">
    <form>
      <div class="form-group">
        <label for="useremail">EMAIL</label>
        <input
          type="email"
          class="form-control"
          name="email"
          id="useremail"
          v-validate="'required|email'"
          v-model="form.user.email"
          :class="{'is-invalid' : errors.has('tel')}"
          placeholder="PLEASE INPUT EMAIL"
        />
        <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
      </div>

      <div class="form-group">
        <label for="username">ORDERER NAME</label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="username"
          v-model="form.user.name"
          v-validate="'required'"
          :class="{'is-invalid' : errors.has('name')}"
          placeholder="INPUT NAME"
        />
        <span class="text-danger" v-if="errors.has('name')">NAME MUST BE INPUT</span>
      </div>

      <div class="form-group">
        <label for="usertel">PHONE NUMBER</label>
        <input
          type="tel"
          class="form-control"
          name="tel"
          id="usertel"
          v-model="form.user.tel"
          v-validate="'required'"
          :class="{'is-invalid' : errors.has('tel')}"
          placeholder="PLEASE INPUT PHONE NUMBER"
        />
        <span class="text-danger" v-if="errors.has('tel')">PHONE NUMBER MUST BE INPUT</span>
      </div>

      <div class="form-group">
        <label for="useraddress">ADDRESS</label>
        <input
          type="address"
          class="form-control"
          name="address"
          id="useraddress"
          v-model="form.user.address"
          v-validate="'required'"
          :class="{'is-invalid' : errors.has('address')}"
          placeholder="PLEASE INPUT ADDRESS"
        />
        <span class="text-danger" v-if="errors.has('address')">ADDRESS MUST BE INPUT</span>
      </div>

      <div class="form-group">
        <label for="useraddress">MESSAGE</label>
        <textarea name id class="form-control" cols="30" rows="5" v-model="form.message"></textarea>
      </div>

      <div class="d-flex justify-content-between">
        <router-link class="btn btn-primary" to="front_cart_items">BACK TO CART</router-link>
        <button class="btn btn-danger" @click.prevent="createOrder">SEND ORDER</button>
      </div>

    </form>
  </div>
</template>

<script>
import $ from "jquery";
//import Pagination from "../Pagination";

export default {
  components: {
    //Pagination
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
      }
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
          console.log(response.data);
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
              vm.$router.push(`front_checkout/${response.data.orderId}`);
            }
            //vm.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log("尚有欄位未填寫");
          vm.isLoading = false;
        }
      });
    }
  },

  computed: {
    activatedList() {
      const vm = this;
      return vm.products.filter(function(item) {
        return item.is_enabled;
      });
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>