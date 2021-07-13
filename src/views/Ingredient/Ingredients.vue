<template>
  <base-card title="Ingredients">
    <template v-slot:actions>
      <q-btn
        color="positive"
        icon="add"
        label="New Ingredient"
            size="sm"
        to="/ingredients/create"
      />
    </template>
    <template v-slot:body v-if="ingredients">
      <base-list :items="ingredients" @deleteItem="deleteIngredient" />
    </template>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Ingredients",
  components: {},
  setup() {
    const store = useStore();
    store.dispatch("ingredient/loadIngredients");

    const ingredients = computed(() => {
      return store.getters["ingredient/getIngredients"];
    });

    const deleteIngredient = function(id) {
      store.dispatch("ingredient/deleteIngredient", {id:id});
    };

    return { ingredients, deleteIngredient };
  },
};
</script>
