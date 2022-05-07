import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import { router } from "./router";
import "highlight.js/styles/atom-one-dark.css";

import { today, thisWeek, thisMonth } from "./mocks";

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.get = async (url: string) => {
  if (url === "/posts") {
    await delay();
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  }
};

const app = createApp(App);

app.use(router);
app.mount("#app");
