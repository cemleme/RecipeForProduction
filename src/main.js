import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAa-WVyo1_M8NpijljbhPGtOm4UPaZT5xg",
  authDomain: "recipe-for-production.firebaseapp.com",
  projectId: "recipe-for-production",
  storageBucket: "recipe-for-production.appspot.com",
  messagingSenderId: "404432522730",
  appId: "1:404432522730:web:6260cf1871bf48dcd7f693",
  measurementId: "G-F8GR2EJKYX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();


import BaseCard from './components/UI/BaseCard.vue';
import BaseList from './components/UI/BaseList.vue';

const app = createApp(App).use(Quasar, quasarUserOptions);

app.component('base-card', BaseCard);
app.component('base-list', BaseList);

app
  .use(store)
  .use(router)
  .mount("#app");
