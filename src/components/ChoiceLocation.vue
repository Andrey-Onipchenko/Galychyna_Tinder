<template>
  <div class="choice-location" id="location">
    <!-- <FavoriteLocations :likes="likes" v-if="!finishChoice" /> -->
    <div class="favorite-locations" v-if="!finishChoice">
      <img
        class="favorite-locations__likes"
        src="../assets/img/favoriteLocations/likes.svg"
        alt=""
      />
      <img
        class="favorite-locations__item"
        :src="like.images[0]"
        alt=""
        v-for="(like, index) in likes"
        :key="index"
        @click="openLocatin(like)"
      />
    </div>
    <div class="choice-location__wrap" v-if="!finishChoice">
      <div class="logos">
        <a href="https://galychyna.com.ua/production/yogurts/" target="_blank"
          ><img src="../assets/img/\choiceLocation/logo_gal.svg" alt=""
        /></a>
        <a href="https://tochka.net/" target="_blank"
          ><img src="../assets/img/\choiceLocation/logo_tochka.svg" alt=""
        /></a>
        <img src="../assets/img/\choiceLocation/tinder.svg" alt="" />
      </div>
      <div class="card-location" ref="cardLocation">
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
                :src="renderSlide(slide, index)"
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
            <div class="card-desc__content" ref="descContent">
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
        <div class="card-controls" ref="controls">
          <button
            class="card-controls__btn card-controls__dislike"
            :class="info ? 'card-controls__dislike-info' : ''"
            @click="dislikeLocation"
          ></button>
          <button
            class="card-controls__btn card-controls__like"
            :class="info ? 'card-controls__like-info' : ''"
            @click="likeLocation"
          ></button>
        </div>
      </div>
    </div>
    <div class="choice-finish" v-else>
      <div class="choice-finish__content">
        <h3 class="choice-finish__title">Хей, вітаємо Тебе!</h3>
        <p class="choice-finish__description">
          Маю сказати, ти маєш відмінний смак!
        </p>
        <p class="choice-finish__description">
          Тепер ти знаєш усе про свої місця сили, які наповнять тебе невгамовною
          силою Карпат! Запрошуємо відвідати їх та переконатись у цьому
          особисто!
        </p>
        <p class="choice-finish__description">
          P.S. Поглянь уважніше ще раз, ти міг пропустити особливу локацію…
        </p>
        <div class="choice-finish__btns">
          <a
            href="https://www.facebook.com/sharer.php?u=https://galychyna.tochka.net/index.html"
            class="choice-finish__fb choice-finish__btn"
            @click="analiticsShare"
          >
            Поділитись <img src="../assets/img/choiceLocation/fb.svg" alt="" />
          </a>
          <button
            class="choice-finish__again choice-finish__btn"
            @click="playAgain"
          >
            Пройти ще раз!
          </button>
        </div>
        <div class="choice-finish__list">
          <div
            class="choice-finish__card"
            v-for="loc in locationAll"
            :key="loc.id"
            @click="openLocatin(loc)"
          >
            <img
              class="choice-finish__card-img"
              :class="!loc.like && 'choice-finish__card-img-dislike'"
              :src="loc.images[0]"
              alt=""
            />
            <h4 class="choice-finish__card-title">{{ loc.title }}</h4>
            <img
              class="choice-finish__card-like"
              src="../assets/img/favoriteLocations/likes.svg"
              alt=""
              v-if="loc.like"
            />
            <img
              class="choice-finish__card-dislike"
              src="../assets/img/choiceLocation/dislike_info.svg"
              alt=""
              v-else
            />
          </div>
        </div>
      </div>
    </div>
    <Popup v-if="isPopup" :location="popupData" @closePopup="closePopup" />
  </div>
</template>
<script>
// import FavoriteLocations from "@/components/FavoriteLocations.vue";
import Popup from "@/components/Popup.vue";
import { mapGetters } from "vuex";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      locationAll: [],
      location: {},
      locationIndex: 0,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      info: false,
      likes: [],
      countTrack: 0,
      clickNext: 0,
      slideWidth: 0,
      finishChoice: false,
      isPopup: false,
      popupData: {},
    };
  },
  watch: {
    finishChoice() {
      this.analiticsBoy();
    },
  },
  components: {
    // FavoriteLocations,
    Popup,
  },
  computed: {
    ...mapGetters(["getLocation"]),
    bulletsLength() {
      return this.countTrack > 1;
    },
  },
  mounted() {
    this.locationAll = this.getLocation;
    this.location = this.locationAll[this.locationIndex];
    this.slideWidth = this.$refs.cardLocation.clientWidth;
    this.countTrack = this.location.images.length;
  },
  methods: {
    renderSlide(slide) {
      console.log(this.location);
      if (window.innerWidth > 600) {
        return slide;
      } else {
        if (this.location?.imgmob) {
          return this.location?.imgmob;
        } else {
          return slide;
        }
      }
    },
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
        this.$refs.controls.style = `background: linear-gradient( 181.22deg,rgba(249, 249, 252, 0.88) 10.99%,#f9f9fc 50% ); height: 80px`;
        event.target.setAttribute("data-descbtn", "down");
        this.info = true;
      } else {
        this.$refs.description.style = ``;
        this.$refs.descWrapper.style = ``;
        this.$refs.descBtn.style = ``;
        this.$refs.controls.style = ``;
        event.target.setAttribute("data-descbtn", "info");
        this.info = false;
      }
    },
    likeLocation() {
      this.likes.push(this.location);
      this.nextLocation();
    },
    dislikeLocation() {
      this.nextLocation();
    },
    nextLocation() {
      this.$refs.cardLocation.style.opacity = "0";
      this.$refs.description.style = ``;

      this.$refs.descBtn.style = ``;
      this.$refs.controls.style = ``;
      this.$refs.descBtn.setAttribute("data-descbtn", "info");
      this.info = false;
      this.locationIndex += 1;
      if (this.locationIndex < this.locationAll.length) {
        setTimeout(() => {
          this.$refs.descWrapper.style = `height: auto; `;
        }, 400);
        setTimeout(() => {
          this.location = this.locationAll[this.locationIndex];
          this.countTrack = this.location.images.length;
          this.$refs.track.style.transform = `translateX(0px)`;
        }, 500);
        setTimeout(() => {
          this.$refs.cardLocation.style.opacity = "1";
        }, 600);
        setTimeout(() => {
          this.$refs.descWrapper.style = ``;
        }, 600);
      } else {
        this.finishLocation();
        this.finishChoice = true;
      }
    },
    changeSlide(index) {
      this.$refs.track.style.transform = `translateX(-${
        this.slideWidth * index
      }px)`;
    },
    finishLocation() {
      for (let i = 0; i < this.locationAll.length; i++) {
        for (let k = 0; k < this.likes.length; k++) {
          if (this.locationAll[i].id === this.likes[k].id) {
            this.locationAll[i].like = true;
          }
        }
      }
    },
    playAgain() {
      this.analiticsPlayAgain();
      document.location.reload();
    },
    openLocatin(location) {
      console.log(location);
      this.isPopup = true;
      this.popupData = location;
    },
    closePopup(prop) {
      this.isPopup = prop;
    },
    analiticsShare() {
      this.$gtag.event("click", {
        event_category: "galychyna",
        event_label: "cher",
      });
    },
    analiticsPlayAgain() {
      this.$gtag.event("click", {
        event_category: "galychyna",
        event_label: "again",
      });
    },
    analiticsBoy() {
      this.$gtag.event("click", {
        event_category: "galychyna",
        event_label: "transition",
      });
    },
  },
};
</script>

<style lang="scss">
.logos {
  position: absolute;
  top: 45px;
  left: 7%;
  a {
    display: block;
    margin-bottom: 20px;
  }
  @include tablet {
    display: none;
  }
}
.choice-location {
  width: 100%;
  height: 100vh;
  background: url("../assets/img/choiceLocation/bg.png") bottom no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  &__wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    @include mobile {
      align-items: flex-start;
    }
  }
}
.favorite-locations {
  height: 100vh;
  width: 60px;
  background: $white;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 10px;
  overflow: auto;
  z-index: 1;
  @include mobile {
    height: 10vh;
    width: 100vw;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
  }
  &__likes {
    max-width: 31px;
    width: 100%;
    margin-bottom: 20px;
    @include mobile {
      margin: 0 5px 0 0;
    }
  }
  &__item {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-bottom: 10px;
    cursor: pointer;
    @include mobile {
      width: 36px;
      height: 36px;
      margin: 0 5px 0 0;
    }
  }
}
.card-location {
  max-width: 560px;
  width: 100%;
  height: 670px;
  border-radius: 12px;
  position: relative;
  transition: all 500ms ease-in-out;
  @include notebook {
    height: 90vh;
    max-height: 670px;
  }
  @include mobile {
    height: 100%;
    max-height: 90vh;
  }
}
.card-slider {
  overflow: hidden;
  position: relative;
  &__prev {
    position: absolute;
    width: 16px;
    height: 28px;
    background: url("../assets/img/choiceLocation/arrowLeft.svg") center
      no-repeat;
    left: 20px;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
  }
  &__next {
    position: absolute;
    width: 16px;
    height: 28px;
    background: url("../assets/img/choiceLocation/arrowRight.svg") center
      no-repeat;
    top: 50%;
    z-index: 1;
    right: 20px;
    transform: translateY(-50%);
  }
  &__list {
    display: flex;
    width: 200vw;
    transition: all 500ms ease-in-out;
  }
  &__li {
    min-width: 560px;
    @include mobile {
      min-width: 100vw;
    }
  }
  &__img {
    max-width: 560px;
    width: 100%;
    height: 670px;
    border-radius: 12px;
    filter: drop-shadow(-3px 3px 6px rgba(166, 165, 165, 0.25));
    object-fit: cover;
    @include notebook {
      height: 90vh;
      max-height: 670px;
    }
    @include mobile {
      border-radius: 0;
      height: 90vh;
      max-height: 90vh;
    }
  }
}
.card-bullet {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  &__item {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    width: 45%;
    height: 5px;
    &:nth-child(1) {
      margin-right: 15px;
    }
  }
}
.card-desc {
  position: absolute;
  bottom: 0;
  z-index: 2;
  height: 230px;
  width: 100%;
  background: linear-gradient(
    359.69deg,
    #000000 0.27%,
    rgba(0, 0, 0, 0) 99.73%
  );
  border-radius: 0px 0px 12px 12px;
  padding: 20px 30px 0 30px;
  overflow: auto;
  transition: all 500ms ease-in-out;
  @include mobile {
    height: 200px;
  }
  &__wrapper {
    position: relative;
    height: 80px;
    overflow: hidden;
    @include mobile {
      height: 80px;
    }
  }
  &__btn {
    width: 20px;
    height: 20px;
    background: url("../assets/img/choiceLocation/info.svg") center no-repeat;
    position: absolute;
    top: 30px;
    right: 25px;
    @include mobile {
      top: 0;
      right: 0;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 12px;
    @include mobile {
      font-size: 20px;
      line-height: 20px;
    }
  }
  &__subtitle {
    font-weight: 600;
    max-width: 425px;
    margin-bottom: 15px;
    height: 30px;
    @include mobile {
      font-size: 13px;
      line-height: 17px;
    }
  }
  &__content {
    display: flex;
    align-items: flex-end;
  }
  &__text {
    margin-bottom: 15px;
    @include mobile {
      font-size: 13px;
      line-height: 17px;
    }
  }
}
.card-controls {
  position: absolute;
  bottom: 0;
  z-index: 2;
  border-radius: 0px 0px 12px 12px;
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__btn {
    width: 60px;
    height: 60px;
  }
  &__like {
    background: url("../assets/img/choiceLocation/like.svg") center no-repeat;
    background-size: contain;
    &-info {
      background: url("../assets/img/choiceLocation/like_info.svg") center
        no-repeat;
      background-size: contain;
    }
  }
  &__dislike {
    background: url("../assets/img/choiceLocation/dislike.svg") center no-repeat;
    background-size: contain;
    margin-right: 20px;
    &-info {
      background: url("../assets/img/choiceLocation/dislike_info.svg") center
        no-repeat;
      background-size: contain;
    }
  }
}
.map {
  iframe {
    width: 100%;
    height: 450px;
  }
}
.choice-finish {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    width: 560px;
    background: #f9f9fc;
    border-radius: 12px;
    height: 80vh;
    padding: 20px 35px;
    color: #183f52;
    overflow: hidden;
    @include notebook {
      height: 90vh;
    }
    @include mobile {
      height: 100vh;
      padding: 15px;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 12px;
  }
  &__description {
    margin-bottom: 25px;
    @include notebook {
      margin-bottom: 10px;
    }

    @include mobile {
      font-size: 13px;
      line-height: 17px;
    }
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    @include notebook {
      margin-bottom: 20px;
    }
    @include mobile {
      flex-direction: column;
      margin-bottom: 30px;
    }
  }
  &__btn {
    max-width: 228px;
    width: 100%;
    height: 50px;
    filter: drop-shadow(-3px 3px 6px rgba(148, 169, 181, 0.35));
    border-radius: 40px;
    color: #fff;
    @include mobile {
      max-width: 100%;
    }
  }
  &__fb {
    background: #007dc3;
    display: flex;
    justify-content: center;
    align-items: center;
    @include mobile {
      margin-bottom: 10px;
    }
    img {
      margin-left: 5px;
    }
  }
  &__again {
    background: linear-gradient(90deg, #f88632 0%, #ff4b23 108.23%);
  }
  &__list {
    display: flex;
    column-gap: 2%;
    flex-wrap: wrap;
    height: 60%;
    overflow: auto;
    @include notebook {
      height: 50%;
    }
    @include mobile {
      justify-content: space-around;
      height: 55%;
    }
    @media (max-width: 360px) {
      height: 45%;
    }
  }
  &__card {
    box-shadow: -3px 3px 6px rgba(166, 165, 165, 0.25);
    filter: drop-shadow(-3px 3px 6px rgba(166, 165, 165, 0.25));
    border-radius: 12px;
    width: 110px;
    height: 136px;
    margin-bottom: 15px;
    &-img {
      max-width: 110px;
      height: 75px;
      width: 100%;
      border-radius: 12px 12px 0 0;
      &-dislike {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
      }
    }
    &-title {
      font-size: 10px;
      line-height: 12px;
      text-align: center;
    }
    &-like,
    &-dislike {
      width: 30px;
      display: block;
      margin: 10px auto 0;
      object-fit: contain;
    }
    &-dislike {
      width: 40px;
      margin: 5px auto 0;
    }
  }
}
</style>
