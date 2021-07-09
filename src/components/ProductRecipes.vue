<template>
  <div>
    <q-list bordered separator>
      <q-item
        v-for="recipe in recipes"
        :key="recipe.id"
        clickable
        v-ripple
        @click="setFavorite(recipe.id, recipe.favorite)"
      >
        <q-item-section>
          <q-item-label
            v-for="(ingredient, ingId) in recipe.ingredients"
            :key="ingId"
          >
            {{ ingredient.name }} - {{ ingredient.percentage }}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-icon color="primary" name="check" v-if="recipe.favorite" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Recipes",
  components: {},
  setup() {
    const route = useRoute();

    const recipes = ref();

    firebase
      .firestore()
      .collection("products")
      .doc(route.params.id)
      .collection("recipes")
      .onSnapshot((snap) => {
        recipes.value = [];
        snap.forEach((doc) => {
          let recipe = doc.data();
          recipe.id = doc.id;
          recipes.value.push(recipe);
        });
      });

    const setFavorite = function(recipeId, alreadyFav) {
      if (alreadyFav) return;

      const recipeCollection = firebase
        .firestore()
        .collection("products")
        .doc(route.params.id)
        .collection("recipes");

      recipeCollection
        .where("favorite", "==", true)
        .get()
        .then((snapshots) => {
          snapshots.forEach((item) => {
            recipeCollection.doc(item.id).update({ favorite: false });
          });

          recipeCollection.doc(recipeId).update({ favorite: true });
        });
    };

    return { recipes, setFavorite };
  },
};
</script>
