<template>
  <div class="productList-wrap">
    <loading :active.sync="isLoading"></loading>

    <div class="dashboard-table-wrap my-3">
      <div class="text-right mb-3">
        <button class="btn btn-primary" @click="openModal(true)">ADD PRODUCT</button>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th width="15%">CATEGORY</th>
            <th>PROD NAME</th>
            <th width="10%">ORIG PRICE</th>
            <th width="10%">SELL PRICE</th>
            <th width="8%">ACTIVE</th>
            <th width="15%">EDIT</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price | currency}}</td>
            <td class="text-right">{{item.price | currency}}</td>
            <td class="text-center">
              <span class="text-success" v-if="item.is_enabled">ENABLE</span>
              <span class="text-danger" v-else>DISABLE</span>
            </td>
            <td class="text-center">
              <button
                class="btn btn-outline-primary btn-sm mr-1"
                @click="openModal(false, item)"
              >EDIT</button>
              <button
                class="btn btn btn-outline-danger btn-sm"
                @click="openDeleteProductModal(item)"
              >DELE</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @changePage="getProducts"></Pagination>

    <!-- update product modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>ADD PRODUCT</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">IMAGE LINK</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="INPUT IMG LINK"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    or UPLOAD IMG
                    <i class="fas fa-circle-notch fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">PRODUCT TITLE</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="PRODUCT TITLE"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">CATEGORY</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="INPUT CATEGORY"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">UNIT</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="INPUT UNIT"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">ORIG PRICE</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="INPUT ORIG PRICE"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">SELL PRICE</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="INPUT SELL PRICE"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="content">PROD CONTENT</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="INPUT PROD CONTENT"
                    rows="4"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="description">PROD DESCRIPTION</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="INPUT PROD DESCRIPTION"
                    rows="4"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">ENABLE</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-third" data-dismiss="modal">CANCEL</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
              <i class="fas fa-circle-notch fa-spin" v-if="status.itemUpdating"></i> ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delete product modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>DELETE PRODUCT</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            DELETE
            <strong class="text-danger">{{ tempProduct.title }}</strong> ( ITEM CANNOT BE RESTORE AFTER DELETION )
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteProduct">ACCEPT</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/back/Pagination";

export default {
  components: {
    Pagination
  },

  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
        itemUpdating: false
      },
      pagination: {}
    };
  },

  methods: {
    getProducts(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },

    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },

    openDeleteProductModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },

    updateProduct() {
      let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product`;
      let httpMethod = "post";
      const vm = this;
      vm.status.itemUpdating = true;

      if (!vm.isNew) {
        api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      vm.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          vm.status.itemUpdating = false;
          $("#productModal").modal("hide");
          vm.getProducts(vm.pagination.current_page);
        } else {
          $("#productModal").modal("hide");
          vm.status.itemUpdating = false;
          vm.getProducts(vm.pagination.current_page);
          vm.$bus.$emit("message:push", "Fail to add to product", "third");
        }
      });
    },

    deleteProduct() {
      const vm = this;
      let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts(vm.pagination.current_page);
        } else {
          $("#delProductModal").modal("hide");
          vm.getProducts(vm.pagination.current_page);
          vm.$bus.$emit("message:push", "Fail to delete to product", "third");
        }
      });
    },

    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();

      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/upload`;
      vm.status.fileUploading = true;
      vm.$http
        .post(url, formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        })
        .then(response => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            vm.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    }
  },

  created() {
    this.getProducts();
  }
};
</script>
