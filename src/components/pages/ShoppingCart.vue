<template>
  <div>
    <div class="my-5 row justify-content-center">
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
    </div>
  </div>
</template>