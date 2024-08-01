import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lazyLoad from "./directives/lazyload";
import "./assets/styles/global.css";

createApp(App).directive("lazyload", lazyLoad).use(router).mount("#app");
