<template>
  <div class="container mt-4">
    <loading :active.sync="isLoading"></loading>

    <div class="trace-order-wrap">
      <div class="input-group mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="INPUT ORDER ID"
          aria-label="Order ID"
          aria-describedby="basic-addon2"
          v-model="inputOrderId"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="getOrderById">SEARCH</button>
        </div>
      </div>

      <div class="empty-order-wrap" v-if="Object.keys(order.user).length === 0">
        <img src="@/assets/img/box.png" />
        <h6 class="my-3">PLEASE ENTER YOUR ORDER ID</h6>
      </div>

      <div class="mt-3" v-if="Object.keys(order.user).length !== 0">
        <form @submit.prevent="payOrder">
          <div class="orderTable-title">
            <h4>OEDER LIST</h4>
          </div>

          <table class="orderList-table table">
            <thead>
              <th>NAME</th>
              <th class="text-center" width="20%">QTY</th>
              <th class="text-center">SUB</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle text-left">{{item.product.title}}</td>
                <td class="align-middle text-center">{{item.qty}} {{item.product.unit}}</td>
                <td class="align-middle text-right">{{item.final_total | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">GRAND TOTAL</td>
                <td class="text-right">{{order.total | currency}}</td>
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
                <th >EMAIL</th>
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
                  <span class="text-light-danger" v-else>OUTSTANDING PAYMENT</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <button class="btn btn-primary" v-if="!order.is_paid">PAY ORDER</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      inputOrderId: "",
      order: {
        user: {}
      }
    };
  },

  methods: {
    getOrderById() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.inputOrderId}`;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        if (response.data.order != null) {
          vm.order = response.data.order;
          vm.inputOrderId = "";
          vm.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", "Order ID not found", "third");
          vm.isLoading = false;
        }
      });
    },

    payOrder() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/pay/${vm.order.id}`;
      vm.isLoading = true;

      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.getOrder();
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
        }
      });
    },

    getOrder() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.order.id}`;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.order = response.data.order;
          vm.isLoading = false;
        }
      });
    }
  }
};
</script>
