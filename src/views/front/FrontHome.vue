<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <FrontSlideshow class="mb-3"></FrontSlideshow>

    <div class="mid-banner mb-3">
      <div class="mid-banner-img">
        <div id="couponBtn" class="mid-banner-content" @click="copyCouponCode()">
          <h4>BUILD PC DISCOUNT</h4>
          <p class="m-0">Click to get 10% off Coupon Code</p>
        </div>
      </div>
    </div>

    <div id="heroProducts" class="mb-3">
      <div class="row">
        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            class="link-block"
            @click="getProduct('-MA13AwgWT1qNex6b85M')"
            href="#/front_single_product/-MA13AwgWT1qNex6b85M"
          >
            <div class="card">
              <div class="card-header">
                <h4>RADEON VII 16G</h4>
                <p>First 7nm GPU</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1592393648391.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=n7SmEJ2h6TtwsEW7XTbWb4lzBvfsrFqpz37ePzRuzT%2BcrpMn1SMsrsA0tkMk0rnY3oVjX0B0Ed7et38rCBffO9iPiCiOJqjyF1XWDPDdIDfL0B0dYvreMHj28f%2BJ03BCYX%2Ba73jOSoI%2F%2FNVG5QVQdLPnqeU84XLfwkZN9apxrBqhbMm0vBGUAER3LHIFGNFRb6rVZZOfko10ejwCzt0jzwOe%2FLgPVqZJFMsB3%2B58boeGNdNftauAaNJFY1pmdWmqlnD%2FGUE2rqlts1vITBT2yHftbUS5GpPqchJJSpXKzQ6r1YPMZbY45BvPwaMiJd1eX5lTwY%2B%2BBZjTDyNfltM1uw%3D%3D)"
              ></div>
            </div>
          </a>
        </div>

        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            class="link-block"
            @click="getProduct('-M9y6Rpb6D6ntBcwB5XZ')"
            href="#/front_single_product/-M9y6Rpb6D6ntBcwB5XZ"
          >
            <div class="card">
              <div class="card-header">
                <h4>X570 AQUA</h4>
                <p>Full Water Cooling System</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1592327410828.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=W3TWo7fHRjye%2Bab2gBDehcX4tA0RmiHaq22QWO%2BAYcb1om7cWEqNKgxVFseLMp0ucFu5ynYFOB6Tvk7pkndCQ2QT32pFppDoyw1aadNSLkkeDGOi3pHiRPlQEjl5bqnk04kaI0oi7JN4xpnTJDVWG5VBJPnOjKTNE5tYYfwcPhL%2FB6OSolKvYLKLw5bFi9YD7LswSo%2Bzp87LNk%2Ff9bSVC568xil98fTHyO5PyrIXiDHKqXitkiisdx9hhtypaqfht9a7HJfImcKSvdIqYPJqGewZHBkv%2BetQv3oUSxvMAS37Aue0lpfK%2Fkw95S1ltn%2FhvJB%2FitDzutj%2BQeL0r4nyGg%3D%3D)"
              ></div>
            </div>
          </a>
        </div>

        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            class="link-block"
            @click="getProduct('-MBE7OLMRCOp_Z1Mkj48')"
            href="#/front_single_product/-MBE7OLMRCOp_Z1Mkj48"
          >
            <div class="card">
              <div class="card-header">
                <h4>MPG SEKILA 500X</h4>
                <p>Ignite your Battlefield</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1593686150068.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gU6%2FA%2FLD%2FaU6G3uOLthAh%2FpqcqwvUKM%2BhzCQLamFu%2BG7fN47NY38dSqcUHeFxSKuV4aWrU4i8TIYeh%2Bxh3JrV5Cr0PTspQ%2B4CAoUSsEET5FDFO9APerOv7QPOymTP7996Waw%2FqafVgNxUV0LCcrJ3xDVyyggK3cFHo32cHgj5%2FC8DDInxbv7dwhbVjMeS2zyzt4SJXjAP%2FedlZLcfJ0ktKfkD5H2o5KVXqLWzY32clyb%2FciGRPANe9CiMsO3RnagRcY4TUrTlVydlADWVECRmu84HSFf7wFK0hRFEjOuDwIYlbyAQqlKj6mun92k4r0v00FVG7APG4IcRf83aP9gow%3D%3D)"
              ></div>
            </div>
          </a>
        </div>

        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            class="link-block"
            @click="getProduct('-MBE32QzaHahHEuGg3xQ')"
            href="#/front_single_product/-MBE32QzaHahHEuGg3xQ"
          >
            <div class="card">
              <div class="card-header">
                <h4>ROG THOR 1200P</h4>
                <p>Highest class of PSU in the world</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1593685579560.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=M%2FpP8wHuckq9d5v80q46kL06kanZLHITLi4wXNwwK9DnfaJYCGDEVmDcnQSIjZ7IaWEY2kleyDsaS7oSFgRdFl3ORIDVTCnu2VJKQE9UiMlnzBz4RP2Y5TZUuO8vrEK6aRj8oWo1yvgIT4n7XCLVgqpg3oLRWEsmCDa8CFmOtBEr0uzvXw%2BpJ4pOVLE6aSajH2VEMKI0DcB1WEx0iJ%2Fge5jCdaoLQW7GXC04DRVO98fA8VPQEzjDkV2p0lQm37CEPsT1JA3P24DrbwQAEsq9SDkOOWP5g3OYHtA1wVFQkCXjYT5Bsu4BPcx7BYKY6EGuyC9D76qfmwWhE96YosZNqg%3D%3D)"
              ></div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="home-article mb-3">
      <div class="row py-3">
        <div class="col-12 col-lg-6 article-wrap">
          <div class="card bg-dark text-white">
            <div
              class="article-img"
              :style="{ backgroundImage: 'url(' + require('@/assets/img/pc.jpg') + ')' }"
            ></div>
            <div class="card-img-overlay">
              <div class="article-content-wrap">
                <h4 class="card-title">10 Reasons Why You Should Build A PC</h4>
                <p
                  class="card-text"
                >Building a PC is not as difficult as you might think. In fact, if you can follow instructions and operate a screwdriver, you are likely qualified enough to build your own computer.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6 article-wrap">
          <div class="card bg-dark text-white">
            <div
              class="article-img"
              :style="{ backgroundImage: 'url(' + require('@/assets/img/radeon.jpg') + ')' }"
            ></div>
            <div class="card-img-overlay">
              <div class="article-content-wrap">
                <h4 class="card-title">Explore New Powerful "RDNA" Architecture</h4>
                <p
                  class="card-text"
                >The new RDNA architecture is designed for the next generation of efficient high-performance gaming. It’s the DNA that powers your games, the DNA that brings your games to life, the DNA that keeps evolving.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FrontSlideshow from "./FrontSlideshow";

export default {
  components: {
    FrontSlideshow
  },

  data() {
    return {
      products: [],
      isLoading: false
    };
  },

  methods: {
    getAllProducts() {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
      const vm = this;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },

    getProduct(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      const vm = this;
      let heroProducts = vm.categoryFilterList();

      localStorage.setItem("cateFilteredList", JSON.stringify(heroProducts));

      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(
            `../front_single_product/${response.data.product.id}`
          );
        }
      });
    },

    activatedProductFilterList() {
      const vm = this;
      return vm.products.filter(function(item) {
        return item.is_enabled;
      });
    },

    categoryFilterList() {
      const vm = this;
      let tempProducts = vm.activatedProductFilterList();
      tempProducts.reverse();

      return tempProducts.filter(function(item) {
        return item.category.indexOf("hero") !== -1;
      });
    },

    copyCouponCode() {
      const vm = this;
      const couponBtn = document.querySelector("#couponBtn");
      couponBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        document.body.appendChild(input);
        input.setAttribute("value", "VCP10OFF");
        input.select();
        if (document.execCommand("copy")) {
          document.execCommand("copy");
        }
        document.body.removeChild(input);
      });
      vm.$bus.$emit("message:push", 'Coupon Code Copied', 'secondary');
    }
  },

  created() {
    this.getAllProducts();
  }
};
</script>