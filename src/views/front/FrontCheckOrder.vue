<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>

    <div class="">
      <div class="input-group my-4">
        <input
          type="text"
          class="form-control"
          placeholder="Order ID"
          aria-label="Order ID"
          aria-describedby="basic-addon2"
          v-model="inputOrderId"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="getOrderById">Button</button>
        </div>
      </div>

      <div class="my-5">
        <form @submit.prevent="payOrder">
          <table class="table">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>小計</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{item.product.title}}</td>
                <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                <td class="align-middle text-right">{{item.final_total}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{order.total}}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">訂單號碼</th>
                <td>{{order.id}}</td>
              </tr>
              <tr>
                <th width="100">Email</th>
                <td>{{order.user.email}}</td>
              </tr>
              <tr>
                <th>訂購人姓名</th>
                <td>{{order.user.name}}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{order.user.tel}}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{order.user.address}}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span class="text-success" v-if="order.is_paid">付款完成</span>
                  <span class="text-danger" v-else>尚未付款</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <button class="btn btn-danger" v-if="!order.is_paid">確認付款去</button>
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
        user: {} //預先定義user，避免出現(eamil)not define
      }
    };
  },

  methods: {
    getOrderById() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.inputOrderId}`;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        if (response.data.order != null) {
          console.log(response.data);
          vm.order = response.data.order;
          vm.isLoading = false;
        } else {
          console.log("Can't find this order");
          vm.isLoading = false;
        }
      });
    },

    payOrder() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/pay/${vm.order.id}`;
      vm.isLoading = true;

      this.$http.post(api).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.getOrder();
          vm.isLoading = false;
        } else {
          console.log(response.data.message);
          vm.isLoading = false;
        }
      });
    },

    getOrder() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.order.id}`;
      vm.isLoading = true;

      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.order = response.data.order;
          vm.isLoading = false;
        }
      });
    }
  }
};
</script>
