<template>
  <div class="popup">
    <div class="card-location" ref="cardLocation">
      <button class="popup__close" @click="close"></button>
      <div class="card-slider">
        <div class="card-bullet" v-if="bulletsLength">
          <button
            class="card-bullet__item"
            v-for="(slide, index) in location.images"
            :key="slide"
            @click="changeSlide(index)"
          ></button>
        </div>
        <ul class="card-slider__list" ref="track">
          <li
            class="card-slider__li"
            v-for="(slide, index) in location.images"
            :key="slide + index"
          >
            <img
              class="card-slider__img"
              :src="slide"
              alt=""
              ref="carouselImg"
            />
          </li>
        </ul>
      </div>
      <div class="card-desc" ref="description">
        <div class="card-desc__wrapper" ref="descWrapper">
          <button
            class="card-desc__btn"
            @click="showMore"
            data-descbtn="info"
            ref="descBtn"
          ></button>
          <h3 class="card-desc__title">{{ location.title }}</h3>
          <p class="card-desc__subtitle">
            {{ location.subtitle }}
          </p>
          <div class="card-desc__content">
            <div>
              <p
                class="card-desc__text"
                v-for="(description, index) in location.description"
                :key="index"
              >
                {{ description }}
              </p>
            </div>
            <img src="../assets/img/111.png" alt="" />
          </div>
          <div class="map" v-html="location.map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["location"],
  data() {
    return {
      countTrack: 0,
      slideWidth: 0,
    };
  },
  computed: {
    bulletsLength() {
      return this.countTrack > 1;
    },
  },
  methods: {
    showMore(event) {
      let attribute = event.target.getAttribute("data-descbtn");
      if (attribute === "info") {
        if (document.documentElement.clientWidth < 768) {
          this.$refs.description.style = `background: #fff; color: #000; height: 100vh; max-height: 600px`;
        } else {
          this.$refs.description.style = `background: #fff; color: #000; height: 600px; max-height: 600px`;
        }
        this.$refs.descWrapper.style = `height: 100%; overflow: auto; padding-bottom: 80px;`;
        this.$refs.descBtn.style = `top: 0; width: 38px; height: 38px; background: url("https://galychyna.tochka.net/img/down.svg") center no-repeat;`;
        event.target.setAttribute("data-descbtn", "down");
        this.info = true;
      } else {
        this.$refs.description.style = ``;
        this.$refs.descWrapper.style = ``;
        this.$refs.descBtn.style = ``;
        event.target.setAttribute("data-descbtn", "info");
        this.info = false;
      }
    },
    close() {
      this.$emit("closePopup", false);
    },
    changeSlide(index) {
      this.$refs.track.style.transform = `translateX(-${
        this.slideWidth * index
      }px)`;
    },
  },
  mounted() {
    this.slideWidth = this.$refs.cardLocation.clientWidth;
  },
  created() {
    document.documentElement.style = `overflow: hidden;`;
    this.countTrack = this.location.images.length;
  },
  beforeUnmount() {
    document.documentElement.style = `overflow: auto;`;
  },
};
</script>
<style lang="scss">
.popup {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  &__close {
    position: absolute;
    background: url("../assets/img/close.png") center no-repeat;
    width: 38px;
    height: 38px;
    background-size: contain;
    z-index: 1;
    top: 20px;
    right: 20px;
  }
  @include mobile {
    .card-location {
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
    }
    .card-slider__img {
      height: 100vh;
      max-height: 100vh;
    }
  }
}
</style>
