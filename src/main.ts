import { createApp } from "vue";
import "./style.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createVuetify } from "vuetify";
import App from "./App.vue";
import router from "@/router/index";
// Pinia 持久化
import store from "@/store/index";

// Translations provided by Vuetify
import { en, zhHans } from "vuetify/locale";

const vuetify = createVuetify({
  locale: {
    locale: "zhHans",
    messages: { zhHans, en },
  },
  icons: {
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount("#app");
