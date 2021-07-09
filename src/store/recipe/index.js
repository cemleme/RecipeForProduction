export default {
  namespaced: true,
  state: {
    recipes: {
      1: {
        productid: 1,
        ingredients: {
          1: { percentage: 40, name: "Kakao Nibi" },
          2: { percentage: 25, name: "Kakao Yağı" },
          3: { percentage: 15, name: "Şeker" },
          4: { percentage: 20, name: "Hindistan Cevizi Sütü Tozu" },
        },
      },
      2: {
        productid: 1,
        ingredients: {
          1: { percentage: 40, name: "Kakao Nibi" },
          2: { percentage: 25, name: "Kakao Yağı" },
          3: { percentage: 15, name: "Şeker" },
          4: { percentage: 20, name: "Hindistan Cevizi Sütü Tozu" },
        },
      },
      3: {
        productid: 2,
        ingredients: {
          1: { percentage: 40, name: "Kakao Nibi" },
          2: { percentage: 25, name: "Kakao Yağı" },
          3: { percentage: 15, name: "Şeker" },
          5: { percentage: 25, name: "Earl Grey" },
        },
      },
    },
  },
  mutations: {
    addRecipe(state, payload) {
        console.log(payload);
      state.recipes[payload.id] = {
        productId: parseInt(payload.productId),
        ingredients: payload.ingredients,
      };
      console.log(state.recipes);
    },
  },
  actions: {
    addRecipe(context, payload) {
      payload.id = context.getters.getNextKey;
      payload.ingredients = {...payload.ingredients};
      context.commit("addRecipe", payload);

      console.log(context.getters.getRecipes(1));
    },
  },
  getters: {
    getRecipes: (state) => (id) => {
        console.log(id);
        const asArr = Object.entries(state.recipes)
        console.log(asArr);
        const r = asArr.reduce((acc, cur) => {
            acc.push(cur[1]);
            return acc;
        }, []);
        console.log(r);
        return r;
    },
    getNextKey(state) {
      const ids = Object.keys(state.recipes);
      return parseInt(ids[ids.length - 1]) + 1;
    },
  },
};
