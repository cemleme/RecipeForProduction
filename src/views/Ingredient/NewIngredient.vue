<template>
  <base-card title="Create Ingredient">
    <template v-slot:body>
      <ingredient-form v-model="ingredient" />
    </template>
  </base-card>
</template>

<script>
import { reactive } from "vue";

import IngredientForm from "@/components/Form/IngredientForm.vue";

export default {
  name: "NewIngredient",
  components: {IngredientForm},
  setup() {

    const ingredient = reactive(
        {
          name:'',
          kcal: 0,
          fat: 0,
          saturatedFat: 0,
          carbs: 0,
          sugar: 0,
          fiber: 0,
          protein: 0,
          salt: 0,
        });

    return {
      ingredient
    };
  },
};
</script>
