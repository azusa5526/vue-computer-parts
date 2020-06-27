<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <FrontSlideshow class="mb-3"></FrontSlideshow>

    <div class="mid-banner mb-3">
      <div class="mid-banner-img">
        <div class="mid-banner-content">
          <h4>Build your own PC</h4>
          <p>All Products 10% off this month!</p>
        </div>
      </div>
    </div>

    <div id="heroProducts">
      <div class="row my-3">
        <div class="col-lg-3 col-md-6 mb-3 hero-hover">
          <a class="link-block" @click="getProduct('-MA13AwgWT1qNex6b85M')" href="#/front_single_product/-MA13AwgWT1qNex6b85M">
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

        <div class="col-lg-3 col-md-6 mb-3 hero-hover">
          <a class="link-block">
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

        <div class="col-lg-3 col-md-6 mb-3 hero-hover">
          <a class="link-block">
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

        <div class="col-lg-3 col-md-6 mb-3 hero-hover">
          <a class="link-block">
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
      </div>
    </div>

    <div class="build-pc"></div>
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
      isLoading: false
    };
  },

  methods: {
    getProduct(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      const vm = this;
      //vm.randomProduct(vm.categoryFilteredList, 4);

      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(
            `../front_single_product/${response.data.product.id}`
          );

          // sessionStorage.setItem(
          //   "rndProds",
          //   JSON.stringify(vm.tempRandomProducts)
          // );
          // vm.$bus.$emit("getRandomProds", vm.tempRandomProducts);
        }
      });
    }
  },

  created() {}
};
</script>