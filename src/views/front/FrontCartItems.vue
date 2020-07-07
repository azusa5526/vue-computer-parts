<template>
  <div class="item-wrap">
    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none">THUMB NAIL</th>
          <th>NAME</th>
          <th width="20%">QUANTITY</th>
          <th width="20%">SUB</th>
          <th width="15%">REMOVE</th>
        </tr>
      </thead>

      <tbody class="cart-items">
        <tr v-for="item in shoppingCart.carts" :key="item.id">
          <td class="align-middle d-md-table-cell d-none">
            <div
              class="product-preview d-md-block d-none"
              :style="{backgroundImage: `url(${item.product.imageUrl})`}"
            ></div>
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
          <td colspan="3" class="text-right">GRAND TOTAL</td>
          <td class="text-right">{{shoppingCart.total}}</td>
        </tr>
        <tr v-if="shoppingCart.total !== shoppingCart.final_total">
          <td class="d-md-table-cell d-none"></td>
          <td colspan="3" class="text-right text-success">DISCOUNT PRICE</td>
          <td class="text-right text-success">{{shoppingCart.final_total}}</td>
        </tr>
      </tfoot>
    </table>

    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" placeholder="PLEASE INPUT COUPON CODE" v-model="couponCode" />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addCouponCode">APPLY COUPON</button>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4">
      <router-link class="btn btn-primary" to="/frontProducts/all">BACK TO SHOP</router-link>
      <router-link class="btn btn-danger" to="front_orderlist">FILL INFO</router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        cartHasItem: false
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
      }
    };
  },

  methods: {
    getProducts(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },

    removeCartItem(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("message:push", "Remove item succefully", "primary");
          vm.getCart();
          vm.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", 'Fail delete item from cart', 'third');
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
        vm.$bus.$emit("message:push", response.data.message, "primary");

        if (response.data.success) {
          vm.getCart();
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
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