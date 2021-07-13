<template>
  <base-card title="New Product">
    <template v-slot:body>
        <product-form v-model="product" />
    </template>
  </base-card>
</template>

<script>
import ProductForm from "@/components/Form/ProductForm.vue";
import { ref } from "vue";

export default {
  components: {ProductForm},
  setup() {
    const product = ref({name:'', description:''});
    return {product};
  },
};
</script>
