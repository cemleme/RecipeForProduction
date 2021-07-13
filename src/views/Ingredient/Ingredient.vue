<template>
  <base-card v-if="ingredient" :title="ingredient.name">
    <template v-slot:header>
      <div class="text-subtitle2">{{ ingredient.description }}</div>
    </template>
    <template v-slot:actions>
      <q-btn
        color="positive"
        icon="add"
        label="Edit"
        :to="'/ingredients/' + ingredient.id + '/edit'"
        size="sm"
      />
    </template>
    <template v-slot:body>
      <nutrition-facts :nutrition="ingredient" />
    </template>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import NutritionFacts from "@/components/NutritionFacts.vue";

export default {
  name: "Ingredient",
  components: { NutritionFacts },
  setup() {
    const route = useRoute();
    const store = useStore();

    store.dispatch("ingredient/loadIngredients");
    const ingredient = computed(() => {
      return store.getters["ingredient/getIngredient"](route.params.id);
    });

    return { ingredient };
  },
};
</script>
