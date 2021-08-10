import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag-next";
import "./assets/scss/index.scss";

createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, {
    property: {
      id: "UA-8293945-52",
    },
  })
  .mount("#app");
