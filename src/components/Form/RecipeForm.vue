<template>
  <div>
    <div class="row justify-end">
      <q-btn
        color="positive"
        icon="check"
        label="Save"
        size="sm"
        :disabled="!canSave"
        @click="saveRecipe"
      />
      <q-btn-dropdown
        size="sm"
        label="Add Ingredient"
        color="primary"
        icon="add"
        class="q-ml-sm"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="ingredient in availableIngredients"
            :key="ingredient.ingredient"
            @click="addIngredient(ingredient)"
          >
            <q-item-section>
              <q-item-label>{{ ingredient.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <div class="row q-mt-lg">
      <q-list class="col">
        <div
          v-for="(ingredient,index) in recipe.ingredients"
          :key="ingredient.ingredient"
          class="row items-center"
        >
          <ingredient-row
            :title="ingredient.name"
            :percentage="ingredient.percentage"
            class="col-8"
          />
          <q-input
            outlined
            type="number"
            v-model.number="ingredient.percentage"
            dense="dense"
            class="col-2"
          />
          <q-item-section side>
            <q-btn
              round
              size="10px"
              color="negative"
              icon="delete"
              class="q-ml-sm"
              @click="removeIngredient(index)"
            />
          </q-item-section>
        </div>
        <div class="row">
          <ingredient-row
            title="Total"
            :percentage="totalPercentage"
            class="col"
          />
        </div>
      </q-list>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import IngredientRow from "@/components/IngredientRow.vue";

export default {
  components: { IngredientRow },
  props: {
    modelValue: { type: Object, required: true },
    recipeId: { type: String, default: null },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const recipe = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const usedIngredients = ref([]);

    const addIngredient = function(ingredient) {
      usedIngredients.value.push(ingredient.id);
      recipe.value.ingredients.push({
        ingredient: ingredient.id,
        name: ingredient.name,
        percentage: 0,
      });
    };

    const removeIngredient = function(index){
      usedIngredients.value.splice(index, index+1);
      recipe.value.ingredients.splice(index, index+1);
    }

    store.dispatch("ingredient/loadIngredients");
    const availableIngredients = computed(() => {
      return store.getters["ingredient/getIngredients"].filter(
        (i) => !usedIngredients.value.includes(i.id)
      );
    });

    const totalPercentage = computed(() => {
      let sum = 0;
      for (var i in recipe.value.ingredients) {
        sum += recipe.value.ingredients[i].percentage;
      }
      return sum;
    });

    const canSave = computed(() => {
      return totalPercentage.value === 100;
    });

    const saveRecipe = async function() {
      if (totalPercentage.value != 100) {
        alert("not 100");
        return;
      }

      const nutrition = store.getters["ingredient/getNutrition"](
        recipe.value.ingredients
      );

      const ingredientids = recipe.value.ingredients.reduce((acc, cur) => {
        acc.push(cur.ingredient);
        return acc;
      }, []);

      const data = {
        ingredientids: ingredientids,
        ingredients: recipe.value.ingredients,
        nutrition: nutrition,
        favorite: recipe.value.favorite ? recipe.value.favorite : false,
      };

      const payload = {
        data: data,
        productid: route.params.id,
        recipeid: props.recipeId,
      };

      store.dispatch("recipe/saveRecipe", payload).then(() => {
        router.push("/products/" + route.params.id);
      });
    };

    return {
      recipe,
      availableIngredients,
      addIngredient,
      removeIngredient,
      totalPercentage,
      canSave,
      saveRecipe,
    };
  },
};
</script>
