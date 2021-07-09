<template>
  <div v-if="product">
    <base-card :expand="hasRecipe" expandLabel="RECIPES">
      <template v-slot:header>
        <div class="text-h6">{{ product.name }}</div>
        <div class="text-subtitle2">{{ product.description }}</div>
      </template>
      <template v-slot:actions>
        <q-btn
          color="positive"
          icon="add"
          label="New Recipe"
          :to="createLink"
        />
        <q-input
          v-model.number="targetGrams"
          placeholder="Target Grams"
            hint="Target Grams"
          dense
          input-class="text-right"
        />
      </template>
      <template v-slot:body v-if="hasRecipe">
        <div class="row">
          <q-list class="col-xs-12 col-sm-6 q-mb-lg">
            <ingredient-row
              v-for="ingredient in recipe.ingredients"
              :key="ingredient.id"
              :title="ingredient.name"
              :percentage="ingredient.percentage"
              :targetGrams="targetGrams"
            />
          </q-list>
          <div class="col-xs-12 col-sm-6">
            <nutrition-facts :nutrition="recipe.nutrition" />
          </div>
        </div>
      </template>

      <template v-slot:expand v-if="hasRecipe">
        <product-recipes />
      </template>
    </base-card>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import firebase from "firebase/app";
import "firebase/firestore";

import IngredientRow from "../components/IngredientRow.vue";
import ProductRecipes from "@/components/ProductRecipes.vue";
import NutritionFacts from "@/components/NutritionFacts.vue";

export default {
  name: "Product",
  components: { IngredientRow, ProductRecipes, NutritionFacts },
  setup() {
    const route = useRoute();

    const product = ref();
    const targetGrams = ref();

    firebase
      .firestore()
      .collection("products")
      .doc(route.params.id)
      .get()
      .then((doc) => {
        product.value = doc.data();
      });

    const recipe = ref();

    firebase
      .firestore()
      .collection("products")
      .doc(route.params.id)
      .collection("recipes")
      .where("favorite", "==", true)
      .limit(1)
      .onSnapshot((snap) => {
        if (snap.docs.length > 0) recipe.value = snap.docs[0].data();
      });

    const hasRecipe = computed(() => {
      return recipe.value != null;
    });

    const createLink = computed(() => {
      return route.path + "/create";
    });

    return { product, hasRecipe, recipe, createLink, targetGrams };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
