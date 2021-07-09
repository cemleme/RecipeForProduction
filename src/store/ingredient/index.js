import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  namespaced: true,
  state: {
    ingredients: [],
  },
  mutations: {
    setLocalIngredients(state, payload) {
      state.ingredients = payload.ingredients;
    },
  },
  actions: {
    async loadIngredients(context) {
      let ingredients = [];

      const ingredientsRef = await firebase.firestore().collection("ingredients");

      await ingredientsRef.get().then((snap) => {
        snap.forEach((doc) => {
          let ingredient = doc.data();
          ingredient.id = doc.id;
          ingredients.push(ingredient);
        });
      });

      context.commit("setLocalIngredients", { ingredients });
    },
  },
  getters: {
    getIngredients(state) {
      // const db = firebase.firestore();
      // state.ingredients.forEach(ingredient => {
      //     db.collection("ingredients").doc().set(ingredient);
      // });
      return state.ingredients;
    },
    getIngredient: (state) => (id) => {
      return state.ingredients.find((p) => p.id == id);
    },
  },
};
