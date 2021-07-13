<template>
  <div>
    <div class="row justify-end">
      <q-btn
        color="positive"
        icon="check"
        label="Save"
        size="sm"
        :disabled="!canSave"
        @click="saveIngredient"
      />
    </div>
    <q-markup-table flat>
      <tr>
        <td class="text-left">Name</td>
        <td>
          <q-input
            v-model="ingredient.name"
            outlined
            type="text"
            dense="dense"
            class="col"
          />
        </td>
      </tr>
    </q-markup-table>

    <q-markup-table flat>
      <thead class="bg-primary text-white">
        <tr>
          <th class="text-left">Nutrition Facts</th>
          <th class="text-right">%RA for 100gr</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Energy (kcal)</td>
          <td>
            <q-input
              v-model.number="ingredient.kcal"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Fat (gr)</td>
          <td>
            <q-input
              v-model.number="ingredient.fat"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Saturated Fat (gr)</td>
          <td>
            <q-input
              v-model.number="ingredient.saturatedFat"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Carbohydrate (gr)</td>
          <td>
            <q-input
              v-model.number="ingredient.carbs"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Sugars (gr)</td>
          <td>
            <q-input
              v-model.number="ingredient.sugar"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Fiber (gr)</td>
          <td>
            <q-input
              v-model.number="ingredient.fiber"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Protein (gr)</td>
          <td>
            <q-input
              v-model.number="ingredient.protein"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Salt</td>
          <td>
            <q-input
              v-model.number="ingredient.salt"
              outlined
              type="number"
              dense="dense"
              class="col"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: ["modelValue"],
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();

    const ingredient = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const saveIngredient = async function() {
      store
        .dispatch("ingredient/saveIngredient", { ingredient: ingredient.value })
        .then(() => {
          router.push("/ingredients");
        });
    };

    const canSave = computed(() => {
      return true;
    });

    return {
      ingredient,
      canSave,
      saveIngredient,
    };
  },
};
</script>
