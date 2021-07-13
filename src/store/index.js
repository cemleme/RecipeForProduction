import { createStore } from "vuex";
import recipe from "./recipe.js";
import ingredient from "./ingredient.js";
import product from "./product.js";

export default createStore({
  modules: {
    product,
    recipe,
    ingredient,
  },
  state: {
    user:{
      name: '',
      email: '',
      id: null,
      token: null
    }
  },
  mutations: {
    setUser(state,payload){
      state.user = payload;
    }
  },
  actions: {
    setUser(context, payload){
      context.commit('setUser', payload);
    },
    logout(context){
      context.commit('setUser', {name: null, email:null, id: null, token:null});
    },
    clearStates(context)
    {
      context.commit('product/clearStates');
      context.commit('recipe/clearStates');
      context.commit('ingredient/clearStates');
    }
  },
  getters: {
    getUser(state){
      return state.user;
    },
    isAuthenticated(state){
      return state.user && state.user.id;
    }
  },
});
