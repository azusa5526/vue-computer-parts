<template>
  <div class="fsp-container">
    <div class="product-header">
      <div class="row p-4 mb-3 justify-content-center">
        <div class="product-img col-6">
          <img :src="product.imageUrl" class="img-fluid" alt />
        </div>

        <div class="product-info col-6">
          <div class="product-title">
            <h2>{{product.title}}</h2>
          </div>

          <pre>{{product.content}}</pre>
          <div class="price d-flex justify-content-between align-items-baseline">
            <div class="h4 text-danger" v-if="!product.price">現在只要 {{product.origin_price}} 元</div>
            <del class="h5" v-if="product.price">原價 {{product.origin_price}} 元</del>
            <div class="h4 text-danger" v-if="product.price">現在只要 {{product.price}} 元</div>
          </div>
        </div>

      </div>
    </div>

    <div class="product-description">
      <div class="row p-4 mb-3">
        <div class="description-title col-12">
          <h3>商品詳情</h3>
        </div>

        <div class="col-12">
          <pre>{{product.description}}</pre>
        </div>
      </div>
    </div>

    <div class="recommand-products">
      <div class="row p-4 mb-3">
        <div class="recommand-title mb-2 col-12">
          <h5>也許您同樣也會喜歡...</h5>
        </div>

        <div class="card border-0 shadow-sm col-3">
          <div
            style="height: 200px; background-size: contain; background-repeat: no-repeat; background-position: center;"
            :style="{backgroundImage: `url(${product.imageUrl})`}"
          ></div>
          <div class="card-body">
            <h6 class="card-title">{{product.title}}</h6>
            <div class="d-flex justify-content-end">
              <div class="h6" v-if="!product.price">{{product.origin_price}} 元</div>
              <div class="h6" v-if="product.price">{{product.price}} 元</div>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm col-3">
          <div
            style="height: 200px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${product.imageUrl})`}"
          ></div>
          <div class="card-body">
            <h6 class="card-title">{{product.title}}</h6>
            <div class="d-flex justify-content-end">
              <div class="h6" v-if="!product.price">{{product.origin_price}} 元</div>
              <div class="h6" v-if="product.price">{{product.price}} 元</div>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm col-3">
          <div
            style="height: 200px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${product.imageUrl})`}"
          ></div>
          <div class="card-body">
            <h6 class="card-title">{{product.title}}</h6>
            <div class="d-flex justify-content-end">
              <div class="h6" v-if="!product.price">{{product.origin_price}} 元</div>
              <div class="h6" v-if="product.price">{{product.price}} 元</div>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm col-3">
          <div
            style="height: 200px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${product.imageUrl})`}"
          ></div>
          <div class="card-body">
            <h6 class="card-title">{{product.title}}</h6>
            <div class="d-flex justify-content-end">
              <div class="h6" v-if="!product.price">{{product.origin_price}} 元</div>
              <div class="h6" v-if="product.price">{{product.price}} 元</div>
            </div>
          </div>
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
      product: {}
    };
  },

  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${vm.productId}`;

      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.product = response.data.product;
          console.log(vm.product);
        }
      });
    }
  },

  created() {
    this.productId = this.$route.params.productID;
    this.getProduct();
  }
};
</script>