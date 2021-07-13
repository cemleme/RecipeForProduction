<template>
  <base-card title="Recipes">
    <template v-slot:extraBreadcrumbs>
      <q-breadcrumbs-el :label="productName" :to="productLink" />
    </template>
    <template v-slot:actions>
      <q-btn
        color="positive"
        icon="add"
        label="New Recipe"
        :to="createLink"
        size="sm"
      />
    </template>
    <template v-slot:body v-if="recipes">
      <base-list
        :items="recipes"
        :useFilter="false"
        subCollectionPath="recipes/"
        v-if="recipes"
        @selectItem="setFavorite"
        @deleteItem="deleteRecipe"
        @editItem="editRecipe"
      >
        <template v-slot:label="recipe">
          <q-item-label
            v-for="ingredient in recipe.item.ingredients"
            :key="ingredient.id"
            clickable
            v-ripple
          >
            <span class="text-caption">
              {{ ingredient.name }} - {{ ingredient.percentage }}
            </span>
          </q-item-label>
        </template>
        <template v-slot:additionalActionButtons="recipe">
          <q-icon name="star" color="primary" style="font-size: 1.5rem" v-if="recipe.item.favorite"/>
        </template>
      </base-list>
    </template>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Recipes",
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    
    store.dispatch("recipe/loadRecipes", {productid: route.params.id});
    const recipes = computed(() => {
      return store.getters["recipe/getRecipes"](route.params.id);
    });

    store.dispatch("product/loadProducts");
    const productName = computed(() => {
      return store.getters["product/getProductName"](route.params.id);
    });

    const setFavorite = function(item) {
      if (item.favorite) return;

      store.dispatch("recipe/setFavorite", {
        productid: route.params.id,
        recipeid: item.id,
      })
    };

    const deleteRecipe = function(id) {
      store.dispatch("recipe/deleteRecipe", {
        productid: route.params.id,
        recipeid: id,
      });
    };

    const editRecipe = function(id) {
      router.push("/products/" + route.params.id + "/recipes/" + id + "/edit");
    };

    const createLink = computed(() => {
      return "/products/" + route.params.id + "/create";
    });

    const productLink = computed(() => {
      return "/products/" + route.params.id;
    });

    return {
      recipes,
      setFavorite,
      deleteRecipe,
      editRecipe,
      productLink,
      createLink,
      productName
    };
  },
};
</script>
