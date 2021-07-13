<template>
  <base-card title="Edit Product" v-if="product">
    <template v-slot:body>
        <product-form v-model="product" />
    </template>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ProductForm from "@/components/Form/ProductForm.vue";

export default {
  name: "EditProduct",
  components: { ProductForm },
  setup() {
    const route = useRoute();
    const store = useStore();

    store.dispatch("product/loadProducts");
    const product = computed(() => {
      return store.getters["product/getProduct"](route.params.id);
    });

    return {
      product,
    };
  },
};
</script>

