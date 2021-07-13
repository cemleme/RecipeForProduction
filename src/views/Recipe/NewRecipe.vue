<template>
  <base-card title="Create Recipe">
    <template v-slot:extraBreadcrumbs>
      <q-breadcrumbs-el :label="productName" :to="productLink" />
    </template>
    <template v-slot:body>
      <recipe-form v-model="recipe" />
    </template>
  </base-card>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";

import RecipeForm from "@/components/Form/RecipeForm.vue";

export default {
  name: "NewRecipe",
  components: { RecipeForm },
  setup() {
    const route = useRoute();
    const store = useStore();

    const recipe = ref({ ingredients: [] });

    store.dispatch("product/loadProducts");
    const productName = computed(() => {
      return store.getters["product/getProductName"](route.params.id);
    });

    const productLink = computed(() => {
      return "/products/" + route.params.id;
    });

    return {
      productName,
      recipe,
      productLink,
    };
  },
};
</script>
