<template>
  <div v-if="product">
    <base-card
      :title="product.name"
      :expand="hasFavoriteRecipe"
      expandLabel="NUTRITION"
    >
      <template v-slot:header>
        <br />
        <div class="text-subtitle2">{{ product.description }}</div>
      </template>
      <template v-slot:actions>
        <div class="column">
          <q-btn
            color="positive"
            size="sm"
            class="q-mb-sm"
            icon="add"
            label="New Recipe"
            :to="createLink"
          />
          <q-btn
            color="warning"
            size="sm"
            class="q-mb-sm"
            icon="add"
            label="Edit Recipe"
            @click="editFavoriteRecipe"
          />
          <q-btn
            color="primary"
            size="sm"
            class="q-mb-sm"
            icon="add"
            label="All Recipes"
            :to="recipesLink"
          />
        </div>
      </template>
      <template v-slot:body v-if="hasFavoriteRecipe">
        <q-card-actions align="right">
          <q-input
            v-model.number="targetGrams"
            placeholder="Target Grams"
            dense
            input-class="text-right"
          />
        </q-card-actions>
        <q-list class="col">
          <ingredient-row
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.id"
            :title="ingredient.name"
            :percentage="ingredient.percentage"
            :targetGrams="targetGrams"
          />
        </q-list>
      </template>

      <template v-slot:expand v-if="hasFavoriteRecipe">
        <nutrition-facts :nutrition="recipe.nutrition" />
      </template>
    </base-card>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import IngredientRow from "@/components/IngredientRow.vue";
import NutritionFacts from "@/components/NutritionFacts.vue";

export default {
  name: "Product",
  components: { IngredientRow, NutritionFacts },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const targetGrams = ref();

    store.dispatch("product/loadProducts");
    const product = computed(() => {
      return store.getters["product/getProduct"](route.params.id);
    });

    store.dispatch("recipe/loadFavoriteRecipe", route.params.id);
    const recipe = computed(() => {
      return store.getters["recipe/getFavoriteRecipe"](route.params.id);
    });

    const hasFavoriteRecipe = computed(() => {
      return recipe.value != null && Object.keys(recipe.value).length > 0;
    });

    const createLink = computed(() => {
      return route.path + "/create";
    });

    const recipesLink = computed(() => {
      return route.path + "/recipes";
    });

    const editFavoriteRecipe = function() {
      if(!recipe.value) return;
      router.push("/products/" + route.params.id + "/recipes/" + recipe.value.id + "/edit");
    };

    return {
      product,
      hasFavoriteRecipe,
      recipe,
      createLink,
      recipesLink,
      targetGrams,
      editFavoriteRecipe,
    };
  },
};
</script>