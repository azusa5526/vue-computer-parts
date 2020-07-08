<template>
  <div class="checkout-wrap">
    <loading :active.sync="isLoading"></loading>

    <form @submit.prevent="payOrder">
      <div class="orderTable-title">
        <h4>OEDER LIST</h4>
      </div>

      <table class="table">
        <thead>
          <th class="text-left">NAME</th>
          <th class="text-center">QUANTITY</th>
          <th class="text-center">SUB</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle text-left">{{item.product.title}}</td>
            <td class="align-middle text-center">{{item.qty}} {{item.product.unit}}</td>
            <td class="align-middle text-right">$ {{item.final_total}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">GRAND TOTAL</td>
            <td class="text-right">$ {{order.total}}</td>
          </tr>
        </tfoot>
      </table>

      <div class="orderTable-title">
        <h4>RECIPIENT INFO</h4>
      </div>

      <table class="table">
        <tbody>
          <tr>
            <th width="130px">ORDER NUM</th>
            <td>{{order.id}}</td>
          </tr>
          <tr>
            <th>EMAIL</th>
            <td>{{order.user.email}}</td>
          </tr>
          <tr>
            <th>ORDERER NAME</th>
            <td>{{order.user.name}}</td>
          </tr>
          <tr>
            <th>PHONE NUMBER</th>
            <td>{{order.user.tel}}</td>
          </tr>
          <tr>
            <th>ADDRESS</th>
            <td>{{order.user.address}}</td>
          </tr>
          <tr>
            <th>PAYMENT STATUS</th>
            <td>
              <span class="text-success" v-if="order.is_paid">PAID</span>
              <span class="text-danger" v-else>OUTSTANDING PAYMENT</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right">
        <button class="btn btn-danger" v-if="!order.is_paid">PAY ORDER</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orderId: "",
      order: {
        user: {}
      }
    };
  },

  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.orderId}`;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.order = response.data.order;
          vm.isLoading = false;
        }
      });
    },

    payOrder() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/pay/${vm.orderId}`;
      vm.isLoading = true;

      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.getOrder();
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
        }
      });
    }
  },

  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
};
</script>