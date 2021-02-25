import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import BaseButton from "./components/UI/BaseButton.vue";
import BaseCard from "./components/UI/BaseCard.vue";
const BaseDialog = defineAsyncComponent(() =>
  import("./components/UI/BaseDialog.vue")
);
const BaseSpinner = defineAsyncComponent(() =>
  import("./components/UI/BaseSpinner.vue")
);

const app = createApp(App);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);

app.use(router);
app.use(store);

app.mount("#app");
