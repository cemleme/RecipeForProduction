<template>
  <base-card title="Edit Ingredient" v-if="ingredient">
    <template v-slot:body>
      <ingredient-form v-model="ingredient" />
    </template>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import IngredientForm from "@/components/Form/IngredientForm.vue";

export default {
  name: "EditIngredient",
  components: { IngredientForm },
  setup() {
    const route = useRoute();
    const store = useStore();

    store.dispatch("ingredient/loadIngredients");
    const ingredient = computed(() => {
      return store.getters["ingredient/getIngredient"](route.params.id);
    });

    return {
      ingredient,
    };
  },
};
</script>
