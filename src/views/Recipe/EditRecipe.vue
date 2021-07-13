<template>
  <base-card title="Edit Recipe" v-if="recipe">
    <template v-slot:extraBreadcrumbs>
      <q-breadcrumbs-el :label="productName" :to="productLink" />
    </template>
    <template v-slot:body>
      <recipe-form v-model="recipe" :recipeId="recipeId" />
    </template>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import RecipeForm from "@/components/Form/RecipeForm.vue";

export default {
  name: "EditRecipe",
  components: { RecipeForm },
  setup() {
    const route = useRoute();
    const store = useStore();

    const recipeId = computed(() => {
      return route.params.idr;
    });

    const productId = computed(() => {
      return route.params.id;
    });

    store.dispatch("recipe/loadRecipes", {productid: productId.value});
    const recipe = computed(() => {
      return store.getters["recipe/getRecipe"](productId.value, recipeId.value);
    });

    store.dispatch("product/loadProducts");
    const productName = computed(() => {
      return store.getters["product/getProductName"](productId.value);
    });

    const productLink = computed(() => {
      return "/products/" + productId.value;
    });

    return {
      recipe,
      recipeId,
      productName,
      productLink,
    };
  },
};
</script>
