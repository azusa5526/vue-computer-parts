<template>
  <div class="item-wrap">
    <loading :active.sync="isLoading"></loading>
    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none">THUMB NAIL</th>
          <th>NAME</th>
          <th class="d-sm-table-cell d-none" width="120px">QUANTITY</th>
          <th width="25%">SUB</th>
          <th width="60px">REMOVE</th>
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
          <td class="align-middle text-left">
            {{item.product.title}}
            <div class="text-primary" v-if="item.coupon">COUPON APPLIED: {{item.coupon.title}}</div>
          </td>
          <td class="align-middle d-sm-table-cell d-none qty-adjust">
            <button class="btn btn-outline-secondary" @click="quantitySub(item)">-</button>
            <input type="text" :value="item.qty" readonly="readonly" />
            <button class="btn btn-outline-secondary" @click="quantityPlus(item)">+</button>
          </td>
          <td class="align-middle">
            {{item.product.price | currency}} /{{item.total | currency}}
            <div class="text-primary" v-if="item.coupon">{{item.final_total | currency}}</div>
          </td>

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
          <td class="d-sm-table-cell d-none"></td>
          <td colspan="2" class="text-right">GRAND TOTAL</td>
          <td class="text-right">{{shoppingCart.total | currency}}</td>
        </tr>
        <tr v-if="shoppingCart.total !== shoppingCart.final_total">
          <td class="d-md-table-cell d-none"></td>
          <td class="d-sm-table-cell d-none"></td>
          <td colspan="2" class="text-right text-primary">DISCOUNT PRICE</td>
          <td class="text-right text-primary">{{shoppingCart.final_total | currency}}</td>
        </tr>
      </tfoot>
    </table>

    <div class="input-group mb-3 input-group-sm">
      <input
        type="text"
        class="form-control"
        placeholder="PLEASE INPUT COUPON CODE"
        v-model="couponCode"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addCouponCode">APPLY CODE</button>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4 step-control">
      <router-link class="btn btn-primary" to="/frontProducts/all">BACK TO SHOP</router-link>
      <router-link class="btn btn-danger" to="front_orderlist" v-if="cartHasItem">FILL INFO</router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      isLoading: false,
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
    updateCart(cartItem_id, product_id, qty) {
      const rm_api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${cartItem_id}`;
      const add_api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      const cart = {
        product_id: product_id,
        qty
      };
      vm.isLoading = true;

      vm.$http.delete(rm_api).then(response => {
        if (response.data.success) {
          vm.$http.post(add_api, { data: cart }).then(response => {
            if (response.data.success) {
              vm.getCart();
            } else {
              vm.$bus.$emit(
                "message:push",
                "Fail update(add) cart Qty",
                "third"
              );
            }
          });
        } else {
          vm.$bus.$emit("message:push", "Fail update(del) cart Qty", "third");
          vm.isLoading = false;
        }
      });
    },

    removeCartItem(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;

      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("message:push", "Remove item succefully", "primary");
          vm.isLoading = false;
          vm.getCart();
        } else {
          vm.$bus.$emit("message:push", "Fail delete item from cart", "third");
          vm.isLoading = false;
        }
      });
    },

    addToCart(id, qty) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };

      vm.$http.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          vm.getCart();
        } else {
          vm.$bus.$emit("message:push", "Fail update cart Qty", "third");
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

      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.getCart();
          vm.isLoading = false;
          vm.$bus.$emit("message:push", "Apply coupon succefully", "primary");
        } else {
          vm.isLoading = false;
          vm.$bus.$emit("message:push", "Coupon code not found", "third");
        }
      });
    },

    getCart() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        vm.shoppingCart = response.data.data;
        vm.isLoading = false;
      });
    },

    quantitySub(item) {
      const vm = this;
      if (item.qty > 1) {
        vm.updateCart(item.id, item.product_id, item.qty - 1);
      }
    },

    quantityPlus(item) {
      const vm = this;
      if (item.qty < 5) {
        vm.updateCart(item.id, item.product_id, item.qty + 1);
      }
    }
  },

  computed: {
    cartHasItem() {
      const vm = this;
      if (vm.shoppingCart.carts == undefined) {
        return;
      } else {
        if (vm.shoppingCart.carts.length == 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  },

  created() {
    this.getCart();
  }
};
</script>