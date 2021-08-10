<template>
  <div class="favorite-locations">
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
    />
  </div>
</template>
<script>
export default {
  name: "FavoriteLocations",
  props: {
    likes: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.favorite-locations {
  height: 100vh;
  width: 60px;
  background: $white;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 10px;
  overflow: auto;
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
    @include mobile {
      width: 36px;
      height: 36px;
      margin: 0 5px 0 0;
    }
  }
}
</style>
