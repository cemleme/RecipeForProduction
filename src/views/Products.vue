<template>
  <q-card bordered class="">
    <q-card-section class="">
      <div class="text-right">
        <q-btn
          color="positive"
          icon="add"
          label="New Product"
          to="/products/create"
        />
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <q-list bordered separator>
        <q-item
          v-for="product in products"
          :key="product.id"
          clickable
          v-ripple
          :to="`/products/` + product.id"
        >
          <q-item-section>
            <q-item-label>{{ product.name }}</q-item-label>
            <q-item-label caption>{{ product.description }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon color="primary" name="check" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Products",
  components: {},
  setup() {
    const products = ref();

    firebase
      .firestore()
      .collection("products")
      .onSnapshot((snap) => {
        products.value = [];
        snap.forEach((doc) => {
          let product = doc.data();
          product.id = doc.id;
          products.value.push(product);
        });
      });

    return { products };
  },
};
</script>
