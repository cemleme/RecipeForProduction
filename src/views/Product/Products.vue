<template>
  <base-card title="Products">
    <template v-slot:actions>
      <q-btn
        color="positive"
        icon="add"
        label="New Product"
        size="sm"
        to="/products/create"
      />
    </template>
    <template v-slot:body v-if="products">
      <base-list :items="products" @deleteItem="deleteProduct" />
    </template>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Products",
  components: {},
  setup() {
    const store = useStore();
    
    store.dispatch("product/loadProducts");
    const products = computed(() => {
      return store.getters["product/getProducts"];
    });

    const deleteProduct = function(id) {
      store.dispatch("product/deleteProduct", {id:id});
    };

    return { products, deleteProduct };
  },
};


//import firebase from "firebase/app";
//import "firebase/firestore";
    //const products = ref();

    // firebase
    //   .firestore()
    //   .collection("products")
    //   .onSnapshot((snap) => {
    //     products.value = [];
    //     snap.forEach((doc) => {
    //       let product = doc.data();
    //       product.id = doc.id;
    //       products.value.push(product);
    //     });
    //   });
</script>
