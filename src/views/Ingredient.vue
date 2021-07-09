<template>
  <div>
    <q-card bordered class="">
      <q-card-section>
        <div class="text-h6">{{ ingredient.name }}</div>
        <div class="text-subtitle2">{{ ingredient.description }}</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-markup-table flat>
          <thead class="bg-primary text-white">
            <tr>
              <th class="text-left">Nutrition Facts </th>
              <th class="text-right">%RA for 100gr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Energy (kcal)</td>
              <td class="text-right">{{ ingredient.kcal }}</td>
            </tr>
            <tr>
              <td class="text-left">Fat (gr)</td>
              <td class="text-right">{{ ingredient.fat }}</td>
            </tr>
            <tr>
              <td class="text-left">Saturated Fat (gr)</td>
              <td class="text-right">{{ ingredient.saturatedFat }}</td>
            </tr>
            <tr>
              <td class="text-left">Carbohydrate (gr)</td>
              <td class="text-right">{{ ingredient.carbs }}</td>
            </tr>
            <tr>
              <td class="text-left">Sugars (gr)</td>
              <td class="text-right">{{ ingredient.sugar }}</td>
            </tr>
            <tr>
              <td class="text-left">Fiber (gr)</td>
              <td class="text-right">{{ ingredient.fiber }}</td>
            </tr>
            <tr>
              <td class="text-left">Protein (gr)</td>
              <td class="text-right">{{ ingredient.protein }}</td>
            </tr>
            <tr>
              <td class="text-left">Salt</td>
              <td class="text-right">{{ ingredient.salt }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "Ingredient",
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();

    const ingredient = computed(() => {
      return store.getters.getIngredient(route.params.id);
    });

    return { ingredient };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
