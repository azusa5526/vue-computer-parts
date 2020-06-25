<template>
  <div class="item-wrap">
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none">瀏覽</th>
          <th>品名</th>
          <th width="20%">數量</th>
          <th width="20%">小計</th>
          <th width="15%">移除</th>
        </tr>
      </thead>

      <tbody id="cart-items">
        <tr v-for="item in shoppingCart.carts" :key="item.id">
          <td class="align-middle d-md-table-cell d-none">
            <div class="product-preview d-md-table-cell d-none" :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
          </td>
          <td class="align-middle">
            {{item.product.title}}
            <div class="text-success" v-if="item.coupon">已套用優惠券 {{item.coupon.title}}</div>
          </td>
          <td class="align-middle">{{item.qty}} / {{item.product.unit}}</td>
          <td class="align-middle">{{item.product.price}} / {{item.total}}</td>
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="d-md-table-cell d-none"></td>
          <td colspan="3" class="text-right ">總計</td>
          <td class="text-right">{{shoppingCart.total}}</td>
        </tr>
        <tr v-if="shoppingCart.total !== shoppingCart.final_total">
          <td class="d-md-table-cell d-none"></td>
          <td colspan="3" class="text-right text-success">優惠價</td>
          <td class="text-right text-success">{{shoppingCart.final_total}}</td>
        </tr>
      </tfoot>
    </table>

    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode" />
      <div class="input-group-append">
        <button class="btn btn-outline-third" type="button" @click="addCouponCode">套用優惠碼</button>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4">
      <router-link class="btn btn-outline-primary" to="/frontProducts/all">繼續選購</router-link>
      <router-link class="btn btn-outline-danger" to="front_orderlist">填寫購買資料</router-link>
    </div>
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
        itemAdding: false,
        cartHasItem: false
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
    // getProduct(id) {
    //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
    //   const vm = this;
    //   vm.status.loadingItem = id;

    //   this.$http.get(api).then(response => {
    //     console.log(response.data);
    //     vm.product = response.data.product;
    //     $("#productModal").modal("show");
    //     vm.status.loadingItem = "";
    //   });
    // },

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

        if (vm.shoppingCart.carts.length == 0) {
          vm.status.cartHasItem = false;
        } else {
          vm.status.cartHasItem = true;
        }
      });
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>