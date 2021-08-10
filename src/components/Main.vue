<template>
  <main class="main">
    <div class="container">
      <div class="main__wrap">
        <header class="header">
          <a
            href="https://galychyna.com.ua/production/yogurts/"
            target="_blank"
          >
            <img class="logo" src="../assets/img/main/logo.svg" alt="Логотип"
          /></a>
        </header>
        <img
          class="main__img-title"
          src="../assets/img/main/title.png"
          alt="Карпацький тіндер"
        />
        <h1 class="main__title">Карпати вже чекають на тебе!</h1>
        <p class="main__text">
          Карпати були джерелом натхнення для наших предків, і вони точно
          залишаться ним для нас і наших дітей.
        </p>
        <p class="main__text">
          Разом з молочною компанією «Галичина» ми створили спецпроект
          «Карпатський тіндер», завдяки якому кожен користувач зможе знайти своє
          місце сили в оповитих легендами українських горах.
        </p>
        <p class="main__text">
          Обирай вподобану локацію, створюй match та дізнавайся більше про свій
          вибір.
        </p>
        <div class="main__choose">
          <div class="main__choose-wrap">
            <h3 class="main__choose-title">Продовжити як:</h3>
            <div class="main__choose-gender">
              <a class="main__choose-link" href="#location">Дiвчина</a>
              <a class="main__choose-link" href="#location">Хлопець</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  methods: {
    scrollLocation(param) {
      let height = window.innerHeight;
      window.scrollTo({
        top: height,
        behavior: "smooth",
      });
      if (param === "girl") {
        this.analiticsGirl();
      } else if (param === "boy") {
        this.analiticsBoy();
      }
    },
    changeHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    analiticsGirl() {
      this.$gtag.event("click", {
        event_category: "galychyna",
        event_label: "girl",
      });
    },
    analiticsBoy() {
      this.$gtag.event("click", {
        event_category: "galychyna",
        event_label: "boy",
      });
    },
  },
  mounted() {
    this.changeHeight();
    window.addEventListener("resize", () => this.changeHeight());
  },
};
</script>

<style lang="scss">
.logo {
  max-width: 100px;
  width: 100%;
  @include mobile {
    max-width: 75px;
  }
}
.main {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: url("../assets/img/main/main_bg.png") center no-repeat;
  background-size: cover;
  padding: 40px 0;
  @include tablet {
    display: flex;
    align-items: center;
  }
  @include mobile {
    padding: 0;
  }
  &__wrap {
    height: calc(100vh - 80px);
    max-height: 670px;
    @include flex(space-between);
    flex-direction: column;
    @include tablet {
      max-width: 80vw;
      margin: 0 auto;
    }
    @include mobile {
      max-width: 100vw;
    }
  }
  &__img-title {
    max-width: 470px;
    width: 100%;
  }
  &__title {
    font-family: "Madebarista", serif;
    font-weight: normal;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-shadow: 0px 4px 13px #000000;
    font-size: 50px;
    line-height: 50px;
    @include mobile {
      font-size: 26px;
      line-height: 30px;
    }
  }
  &__text {
    max-width: 460px;
    @include mobile {
      font-size: 13px;
      line-height: 17px;
    }
  }
  &__choose {
    @include flex(flex-end);
    width: 100%;
    @include tablet {
      @include flex(flex-start);
    }
    &-wrap {
      max-width: 340px;
      width: 100%;
    }
    &-title {
      margin-bottom: 20px;
      @include mobile {
        font-size: 13px;
        line-height: 17px;
        font-weight: normal;
      }
    }
    &-gender {
      @include flex(space-between);
    }
    &-link {
      @include flex(center, center);
      width: 160px;
      height: 50px;
      background: linear-gradient(90deg, #f88632 0%, #ff4b23 108.23%);
      border-radius: 40px;
      font-family: "Madebarista", serif;
      font-size: 30px;
      line-height: 34px;
      text-transform: uppercase;
      @include mobile {
        width: 137px;
      }
    }
  }
}
</style>
