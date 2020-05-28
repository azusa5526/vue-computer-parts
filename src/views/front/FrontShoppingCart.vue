<template>
  <div class="row justify-content-center">
    <loading :active.sync="isLoading"></loading>

    <div class="container mt-4" v-if="status.cartHasItem">
      <div class="flex-container">
        <div class="flex-item" :class="{'active-flex-item' : activedPage == 'FrontCartItems'}">
          <h3>01.</h3>
          <h4>查看購物清單</h4>
        </div>
        <div class="flex-item" :class="{'active-flex-item' : activedPage == 'FrontOrderList'}">
          <h3>02.</h3>
          <h4>填寫購買資料</h4>
        </div>
        <div class="flex-item" :class="{'active-flex-item' : activedPage == 'FrontCheckout'}">
          <h3>03.</h3>
          <h4>付款清單</h4>
        </div>
      </div>

      <router-view></router-view>
    </div>

    <div class="mt-4" v-else>
      <img src="@/assets/img/shoppingCart.jpg" />
    </div>
  </div>

  <!-- <div class="my-5 row justify-content-center">
    <div class="my-5 row justify-content-center">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>品名</th>
            <th>數量/單位</th>
            <th>單價/小計</th>
            <th>移除商品</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in shoppingCart.carts" :key="item.id">
            <td class="align-middle">
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">已套用優惠券 {{item.coupon.title}}</div>
            </td>
            <td class="align-middle">{{item.qty}} / {{item.product.unit}}</td>
            <td class="align-middle">{{item.product.price}} / {{item.total}}</td>
            <td>
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
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{shoppingCart.total}}</td>
          </tr>
          <tr v-if="shoppingCart.total !== shoppingCart.final_total">
            <td colspan="3" class="text-right text-success">優惠價</td>
            <td class="text-right text-success">{{shoppingCart.final_total}}</td>
          </tr>
        </tfoot>
      </table>

      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import $ from "jquery";
//import Pagination from "../Pagination";


export default {
  components: {
    //Pagination,
  },

  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: "",
        itemAdding: false,
        cartHasItem: false,
        topProgress: '',
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
      activePage: this.$route.name,

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

    // addToCart(id, qty = 1) {
    //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
    //   const vm = this;
    //   vm.status.itemAdding = true;
    //   const cart = {
    //     product_id: id,
    //     qty
    //   };

    //   this.$http.post(api, { data: cart }).then(response => {
    //     if (response.data.success) {
    //       console.log(response.data);
    //       vm.status.itemAdding = false;
    //       vm.getCart();
    //       $("#productModal").modal("hide");
    //     } else {
    //       console.log("fail to add item to cart");
    //       vm.status.itemAdding = false;
    //       $("#productModal").modal("hide");
    //     }
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
    },

    // createOrder() {
    //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
    //   const vm = this;
    //   const order = vm.form;
    //   vm.isLoading = true;

    //   this.$validator.validate().then(valid => {
    //     if (valid) {
    //       this.$http.post(api, { data: order }).then(response => {
    //         console.log(response.data, "訂單已建立");
    //         if (response.data.success) {
    //           vm.$router.push(`/front_checkout/${response.data.orderId}`);
    //         }
    //         //vm.getCart();
    //         vm.isLoading = false;
    //       });
    //     } else {
    //       console.log("尚有欄位未填寫");
    //       vm.isLoading = false;
    //     }
    //   });
    // }
  },

  computed: {
    activedPage() {
      const vm = this;
      return this.$route.name;
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}

.flex-container {
  display: flex;
  flex-direction: row;
  height: 8rem;
  padding: 15px;
}

.flex-item {
  flex: 1;
  background-color: rgb(243, 242, 242);
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
}

.active-flex-item {
  background-color: rgb(94, 94, 94);
  color: white;
}
</style>