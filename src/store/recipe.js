import firebase from "firebase/app";
import "firebase/firestore";

export default {
  namespaced: true,
  state: {
    loaded: false,
    recipes: {},
  },
  mutations: {
    setLocalRecipes(state, payload) {
      state.recipes[payload.productid] = payload.recipes;
    },
    setFavoriteRecipe(state, payload) {
      if (state.recipes[payload.productid]) {
        const recipe = state.recipes[payload.productid].find(
          (r) => r.id == payload.recipe.id
        );
        if (recipe) {
          recipe.favorite = true;
        } else {
          state.recipes[payload.productid].push(payload.recipe);
        }
      } else {
        state.recipes[payload.productid] = [payload.recipe];
      }
    },
    clearStates(state){
      state.loaded = false;
      state.recipes = [];
    },
  },
  actions: {
    loadRecipes(context, payload = { reload: false }) {
      if (context.state.loaded && !payload.reload) return;

      firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .doc(payload.productid)
        .collection("recipes")
        .onSnapshot((snap) => {
          let recipes = [];
          snap.forEach((doc) => {
            let recipe = doc.data();
            recipe.id = doc.id;
            recipes.push(recipe);
          });
          context.commit("setLocalRecipes", {
            productid: payload.productid,
            recipes: recipes,
          });
        },
        () => {
          //console.log(error);
        });
    },
    deleteRecipe(context, payload) {
      firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .doc(payload.productid)
        .collection("recipes")
        .doc(payload.recipeid)
        .delete()
        .then(() => {
          console.log("Recipe successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    async setFavorite(context, payload) {
      const recipeCollection = await firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .doc(payload.productid)
        .collection("recipes");

      recipeCollection
        .where("favorite", "==", true)
        .get()
        .then((snapshots) => {
          var batch = firebase.firestore().batch();

          snapshots.forEach((item) => {
              batch.update(item.ref, { favorite: false });
          });

          batch.commit().then(() => {
            recipeCollection
              .doc(payload.recipeid)
              .update({ favorite: true });
          }).catch(() => {
            throw new Error("Error: updating the new favorite");
          });
        });
    },
    loadFavoriteRecipe(context, productid) {
      let recipe = {};

      const recipesCollectionRef = firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .doc(productid)
        .collection("recipes");

      recipesCollectionRef
        .where("favorite", "==", true)
        .limit(1)
        .get().then((snap) => {
          if (snap.docs.length > 0) {
            recipe = snap.docs[0].data();
            recipe.id = snap.docs[0].id;
            context.commit("setFavoriteRecipe", {
              productid: productid,
              recipe: recipe,
            });
          }
          //if the product has no favorite recipe, try to get the first recipe and set it as favorite
          else {
            recipesCollectionRef
              .limit(1)
              .get()
              .then((snap) => {
                if(snap.docs.length === 0) return;
                
                recipe = snap.docs[0].data();
                recipe.id = snap.docs[0].id;
                context.commit("setFavoriteRecipe", {
                  productid: productid,
                  recipe: recipe,
                });
                recipesCollectionRef
                  .doc(snap.docs[0].id)
                  .update({ favorite: true });
              });
          }
        });
    },
    async saveRecipe(context, payload) {
      const recipesCollectionRef = await firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .doc(payload.productid)
        .collection("recipes");

      //get or create the recipeRef if the recipe has an id or not
      let recipeRef;
      if (payload.recipeid)
        recipeRef = await recipesCollectionRef.doc(payload.recipeid);
      else recipeRef = await recipesCollectionRef.doc();

      recipeRef.set(payload.data).catch(() => {
        throw new Error("Error: creating recipe:");
      });
    },
    updateRecipesIngredient(context, payload) {
      firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collectionGroup("recipes")
        .where("ingredientids", "array-contains", payload.ingredientid)
        .get()
        .then((querySnapshot) => {
          var batch = firebase.firestore().batch();

          querySnapshot.forEach((doc) => {
            const recipe = doc.data();
            recipe.ingredients
              .filter((i) => i.ingredient == payload.ingredientid)
              .map((i) => (i.name = payload.ingredient.name));

            recipe.nutrition = context.rootGetters["ingredient/getNutrition"](recipe.ingredients);

            batch.set(doc.ref, recipe);
          });

          batch.commit().then(() => {
            console.log('updated the recipes containing changed ingredient');
          }).catch(() => {
            throw new Error("Error: updating recipe ingredient");
          });
        });
    },
  },
  getters: {
    getRecipes: (state) => (productid) => {
      return state.recipes[productid];
    },
    getFavoriteRecipe: (state) => (productid) => {
      if (state.recipes[productid])
        return state.recipes[productid].find((p) => p.favorite == true);
      else return {};
    },
    getRecipe: (state) => (productid, recipeid) => {
      if (state.recipes[productid])
        return state.recipes[productid].find((r) => r.id == recipeid);
      else return {};
    },
    userid(_, _2, rootState){
      return rootState.user.id;
    }
  },
};
