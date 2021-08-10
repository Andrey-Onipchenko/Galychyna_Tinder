module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/scss/vars.scss";
            @import "@/assets/scss/mixin.scss";
          `,
      },
    },
  },
};
