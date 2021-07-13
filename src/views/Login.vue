<template>
  <section id="firebaseui-auth-container"></section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.dispatch("setUser", {
            name: user.displayName,
            id: user.uid,
            email: user.email,
            token: user.refreshToken,
          });
          router.push("/");
        } else {
          let ui = firebaseui.auth.AuthUI.getInstance();
          if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
          }
          var uiConfig = {
            signInOptions: [
              //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
          };
          ui.start("#firebaseui-auth-container", uiConfig);
        }
      });
    });
  },
};
</script>
