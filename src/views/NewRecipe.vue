<template>
  <q-card bordered class=""  v-if="product">
    <q-card-section>
      <div class="row">
        <div class="col">
          <div class="text-h6">{{ product.name }}</div>
          <div class="text-subtitle2">{{ product.description }}</div>
        </div>
        <div class="justify-end">
          <q-btn
            color="positive"
            icon="check"
            label="Save"
            :disabled="!canSave"
            @click="saveRecipe"
          />
          <q-btn-dropdown color="primary" icon="add" class="q-ml-sm">
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
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="row">
        <q-list class="col">
          <div
            v-for="ingredient in ingredients"
            :key="ingredient.ingredient"
            class="row"
          >
            <ingredient-row
              :title="ingredient.name"
              :percentage="ingredient.percentage"
              class="col"
            />
            <q-input
              outlined
              type="number"
              v-model.number="ingredient.percentage"
              dense="dense"
              class="col"
            />
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
    </q-card-section>
  </q-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "vue";

import firebase from 'firebase/app';
import 'firebase/firestore';

import IngredientRow from "../components/IngredientRow.vue";

export default {
  name: "NewRecipe",
  components: { IngredientRow },
  setup() {
    const usedIngredients = ref([]);
    const ingredients = reactive([]);

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    store.dispatch("ingredient/loadIngredients");

    const product = ref();

    firebase.firestore()
      .collection("products")
      .doc(route.params.id)
      .get()
      .then((doc) => {
        product.value = doc.data();
      });

    const addIngredient = function(ingredient) {
      usedIngredients.value.push(ingredient.id);
      ingredients.push({ ...ingredient, percentage: 0 });
    };

    const availableIngredients = computed(() => {
      return store.getters["ingredient/getIngredients"].filter(
        (i) => !(usedIngredients.value.includes(i.id))
      );
    });

    const totalPercentage = computed(() => {
      let sum = 0;
      for (var i in ingredients) {
        sum += ingredients[i].percentage;
      }
      return sum;
    });

    const canSave = computed(() => {
        return totalPercentage.value === 100;
    });

    const saveRecipe = async function() {

        if(totalPercentage.value != 100){
            alert('not 100');
            return;
        }

      const nutrition = ingredients.reduce(
        (acc, cur) => {
          const percentage = parseFloat(cur.percentage) / 100;

          //iterate through all nutritions and get average
          Object.keys(acc).forEach((key) => {
            acc[key] += parseFloat(cur[key]) * percentage;
          });

          return acc;
        },
        {
          kcal: 0,
          fat: 0,
          saturatedFat: 0,
          carbs: 0,
          sugar: 0,
          fiber: 0,
          protein: 0,
          salt: 0,
        }
      );

      const ingredientsShortened = ingredients.reduce((acc, cur) => {
        acc.push({
          ingredient: cur.id,
          name: cur.name,
          percentage: cur.percentage,
        });
        return acc;
      }, []);

      const data = {
        productId: route.params.id,
        ingredients: ingredientsShortened,
        nutrition: nutrition,
      };

      await store.dispatch("product/addRecipe", data);

      router.push('/products/'+route.params.id);
    };

    return {
      product,
      availableIngredients,
      ingredients,
      addIngredient,
      totalPercentage,
      saveRecipe,
      canSave
    };
  },
};
</script>
