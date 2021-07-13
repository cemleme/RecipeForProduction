import firebase from "firebase/app";
import "firebase/firestore";

export default {
  namespaced: true,
  state: {
    loaded: false,
    products: [],
  },
  mutations: {
    setLocalProducts(state, payload) {
      state.products = payload.products;
      state.loaded = true;
    },
    clearStates(state) {
      state.loaded = false;
      state.products = [];
    },
  },
  actions: {
    loadProducts(context, payload = { reload: false }) {
      if (context.state.loaded && !payload.reload) return;
      firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .onSnapshot(
          (snap) => {
            let products = [];
            snap.forEach((doc) => {
              let product = doc.data();
              product.id = doc.id;
              products.push(product);
            });
            context.commit("setLocalProducts", { products });
          },
          () => {
            //console.log(error);
          }
        );
    },
    deleteProduct(context, payload) {
      firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .doc(payload.id)
        .delete()
        .then(() => {
          console.log("Product successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    saveProduct(context, payload) {
      let docRef = firebase
        .firestore()
        .collection("users")
        .doc(context.getters.userid)
        .collection("products")
        .doc();

      if (payload.product.id) {
        docRef = firebase
          .firestore()
          .collection("users")
          .doc(context.getters.userid)
          .collection("products")
          .doc(payload.product.id);
      }

      docRef.set(payload.product).catch(() => {
        throw new Error("Error: creating recipe:");
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
    getProductName: (state) => (id) => {
      const product = state.products.find((p) => p.id == id);
      if (product) return product.name;
      else return "Product";
    },
    userid(_, _2, rootState) {
      return rootState.user.id;
    },
  },
};
