import { createStore } from "vuex";
import recipe from "./recipe";
import ingredient from "./ingredient";
import product from "./product";

export default createStore({
  modules: {
    product,
    recipe,
    ingredient,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
