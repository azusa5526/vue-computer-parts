<template>
  <div id="frontSlideProducts" class="carousel slide full" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#frontSlideProducts" data-slide-to="0" class="active"></li>
      <li data-target="#frontSlideProducts" data-slide-to="1"></li>
      <li data-target="#frontSlideProducts" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">

      <!-- <div class="carousel-item active">
        <img class="d-block w-100" src="@/assets/img/sli.png" alt="First slide" />
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="@/assets/img/sli2.png" alt="Second slide" />
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="@/assets/img/sli3.png" alt="Third slide" />
      </div>-->

      <div class="carousel-item active">
        <div class="rwdimg" :style="{ backgroundImage: 'url(' + require('@/assets/img/productSlide_1_1920x360.jpg') + ')' }"></div>
      </div>
      <div class="carousel-item">
        <div class="rwdimg" :style="{ backgroundImage: 'url(' + require('@/assets/img/productSlide_2_1920x360.jpg') + ')' }"></div>
      </div>
      <div class="carousel-item">
        <div class="rwdimg" :style="{ backgroundImage: 'url(' + require('@/assets/img/productSlide_3_1920x360.jpg') + ')' }"></div>
      </div>
      
    </div>
    <a
      class="carousel-control-prev"
      href="#frontSlideProducts"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#frontSlideProducts"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    
  </div>
</template>