<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
          v-if="user.id"
        />
        <q-toolbar-title>Recipes for Production</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" overlay elevated v-if="user.id">
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/products">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Products
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/ingredients">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Ingredients
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logOut">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>
            <q-item-section>
              Logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "LayoutDefault",
  setup() {
    const store = useStore();
    const router = useRouter();
    const drawer = ref(false);

    const user = computed(() => {
      return store.getters.getUser;
    });

    const logOut = function() {
      router.push("/login");
      firebase.auth().signOut();
      store.dispatch("logout");
      store.dispatch('clearStates');
    };

    return {
      drawer,
      user,
      logOut,
    };
  },
};
</script>
