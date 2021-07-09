<template>
  <base-card>
    <template v-slot:actions>
      <q-btn
        color="positive"
        icon="add"
        label="Create Product"
        @click="createProduct"
      />
    </template>
    <template v-slot:body>
      <div class="q-gutter-y-md column">
        <q-input
          clearable
          filled
          color="purple-12"
          v-model="productName"
          label="Product Name"
        />
        <q-input
          clearable
          filled
          color="purple-12"
          v-model="productDescription"
          label="Product Description"
        />
      </div>
    </template>
  </base-card>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  setup() {
    const router = useRouter();

    const productName = ref("");
    const productDescription = ref("");

    const createProduct = function() {
      firebase
        .firestore()
        .collection("products")
        .add({ name: productName.value, description: productDescription.value, favorite: true })
        .catch(() => {
          throw new Error("Error: creating recipe:");
        })
        .then(() => {
          router.push("/products");
        });
    };

    return { createProduct, productName, productDescription };
  },
};
</script>
