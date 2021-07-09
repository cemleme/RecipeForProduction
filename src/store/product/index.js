import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    setLocalProducts(state, payload) {
      state.products = payload.products;
    },
    setLocalRecipes(state, payload) {
      state.products.find((p) => p.id == payload.productid).recipes =
        payload.recipes;
    },
  },
  actions: {
    async loadProducts(context) {
      let products = [];

      const productsRef = await firebase.firestore().collection("products");

      await productsRef.get().then((snap) => {
        snap.forEach((doc) => {
          let product = doc.data();
          product.id = doc.id;
          products.push(product);
        });
      });

      context.commit("setLocalProducts", { products });
    },
    async loadRecipes(context, payload) {
      const recipesRef = await firebase
        .firestore()
        .collection("products")
        .doc(payload.productid)
        .collection("recipes");

      let recipes = [];

      await recipesRef.get().then((snap) => {
        snap.forEach((doc) => {
          let recipe = doc.data();
          recipe.id = doc.id;
          recipes.push(recipe);
        });
      });

      context.commit("setLocalRecipes", {
        productid: payload.productid,
        recipes,
      });

      console.log(recipes);
    },
    async addRecipe(_, payload) {
      const recipesRef = await firebase
        .firestore()
        .collection("products")
        .doc(payload.productId)
        .collection("recipes");

        recipesRef.add({ingredients: payload.ingredients, nutrition: payload.nutrition})
        .catch(() => {
            throw new Error('Error: creating recipe:');
        });
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProduct: (state) => (id) => {
      return state.products.find((p) => p.id == id);
     },
     
    // getProductNutrition: (state, getters, rootState, rootGetters) => (
    //   recipeIngredients
    // ) => {
    //   //get the used ingredient ids from the recipe to filter the detailed ingredients object
    //   const ingredientIds = recipeIngredients.reduce((acc, cur) => {
    //     acc[cur.id] = true;
    //     return acc;
    //   }, {});

    //   //get a filtered object of used ingredients
    //   const data = rootGetters["ingredient/getIngredients"].filter(
    //     (i) => i.id in ingredientIds
    //   );

    //   //get average of used ingredient nutritions
    //   const result = data.reduce(
    //     (acc, cur, index) => {
    //       const percentage =
    //         parseFloat(recipeIngredients[index].percentage) / 100;

    //       //iterate through all nutritions and get average
    //       Object.keys(acc).forEach((key) => {
    //         acc[key] += parseFloat(cur[key]) * percentage;
    //       });

    //       return acc;
    //     },
    //     {
    //       kcal: 0,
    //       fat: 0,
    //       saturatedFat: 0,
    //       carbs: 0,
    //       sugar: 0,
    //       fiber: 0,
    //       protein: 0,
    //       salt: 0,
    //     }
    //   );

    //   return result;
    // },
  },
};
