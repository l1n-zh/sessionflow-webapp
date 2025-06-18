import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./assets/main.css";


const myTheme = {
    dark: false,
    colors: {
        primary: "#F26B49",
    },
};

const vuetify = createVuetify({
    theme: {
        defaultTheme: "myTheme",
        themes: { myTheme },
    },
    components,
    directives,
    icons: {
        defaultSet: "fa",
        aliases,
        sets: { mdi, fa },
    },
});


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(vuetify);

app.mount("#app");
