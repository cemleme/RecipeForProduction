import firebase from "firebase/app";
import "firebase/firestore";

export default {
  namespaced: true,
  state: {
    loaded: false,
    ingredients: [],
  },
  mutations: {
    setLocalIngredients(state, payload) {
      state.ingredients = payload.ingredients;
    },
    clearStates(state){
      state.loaded = false;
      state.ingredient = [];
    },
  },
  actions: {
    loadIngredients(context, payload = { reload: false }) {
      if (context.state.loaded && !payload.reload) return;

      firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("ingredients")
        .onSnapshot((snap) => {
          let ingredients = [];
          snap.forEach((doc) => {
            let ingredient = doc.data();
            ingredient.id = doc.id;
            ingredients.push(ingredient);
          });
          context.commit("setLocalIngredients", { ingredients });
        },
        () => {
          //console.log(error);
        });
    },
    saveIngredient(context, payload) {
      let docRef = firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("ingredients")
        .doc();

      if (payload.ingredient.id)
      {
        docRef = firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("ingredients")
        .doc(payload.ingredient.id)
      } 

      docRef
        .set(payload.ingredient)
        .catch(() => {
          throw new Error("Error: creating recipe:");
        }).then(() => {
          //update recipes data including this ingredient
          if(payload.ingredient.id){
            context.dispatch("recipe/updateRecipesIngredient", {ingredient: payload.ingredient, ingredientid: payload.ingredient.id}, {root:true});
          }
        });
    },
    deleteIngredient(context, payload) {
      firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("ingredients")
        .doc(payload.id)
        .delete()
        .then(() => {
          console.log("Ingredient successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  getters: {
    getIngredients(state) {
      return state.ingredients;
    },
    getIngredient: (state) => (id) => {
      return state.ingredients.find((p) => p.id == id);
    },
    userid(_, _2, rootState){
      return rootState.user.id;
    },
    getNutrition: (state) => (ingredients) => {
      return ingredients.reduce(
        (acc, cur) => {
          const percentage = parseFloat(cur.percentage) / 100;

          const ingredientData = state.ingredients.find((p) => p.id == cur.ingredient);

          //iterate through all nutritions and get average
          Object.keys(acc).forEach((key) => {
            acc[key] += parseFloat(ingredientData[key]) * percentage;
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
    }
  },
};
