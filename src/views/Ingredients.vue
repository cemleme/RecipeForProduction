<template>
  <div>
    <q-list bordered separator>
      <q-item
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        clickable
        v-ripple
        :to="`/ingredients/` + ingredient.id"
      >
        <q-item-section>
          <q-item-label>{{ ingredient.name }}</q-item-label>
          <q-item-label caption>{{ ingredient.description }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-icon color="primary" name="check" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Products",
  components: {},
  setup() {
    const store = useStore();

    store.dispatch('ingredient/loadIngredients');

    const ingredients = computed(() => {
      return store.getters['ingredient/getIngredients'];
    });

    return { ingredients };
  },
};
</script>
