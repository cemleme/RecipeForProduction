import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {guest: true}
  },
  {
    path: '/',
    redirect: '/products',
    meta: {auth: true}
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Product/Products.vue'),
    meta: {auth: true}
  },
  {
    path: '/products/create',
    name: 'New Product',
    component: () => import('../views/Product/NewProduct.vue'),
    meta: {auth: true}
  },
  {
    path: '/products/:id/create',
    name: 'New Recipe',
    component: () => import('../views/Recipe/NewRecipe.vue'),
    meta: {auth: true}
  },
  {
    path: '/products/:id/recipes',
    name: 'Recipes',
    component: () => import('../views/Recipe/Recipes.vue'),
    meta: {auth: true}
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import('../views/Product/Product.vue'),
    meta: {auth: true}
  },
  {
    path: '/products/:id/edit',
    name: 'Edit Product',
    component: () => import('../views/Product/EditProduct.vue'),
    meta: {auth: true}
  },
  {
    path: '/products/:id/recipes/:idr/edit',
    name: 'Edit Recipe',
    component: () => import('../views/Recipe/EditRecipe.vue'),
    meta: {auth: true}
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => import('../views/Ingredient/Ingredients.vue'),
    meta: {auth: true}
  },
  {
    path: '/ingredients/create',
    component: () => import('../views/Ingredient/NewIngredient.vue'),
    meta: {auth: true}
  },
  {
    path: '/ingredients/:id',
    name: 'Ingredient',
    component: () => import(/* webpackChunkName: "ingredients" */ '../views/Ingredient/Ingredient.vue'),
    meta: {auth: true}
  },
  {
    path: '/ingredients/:id/edit',
    component: () => import('../views/Ingredient/EditIngredient.vue'),
    meta: {auth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth && !store.getters.isAuthenticated) next('/login');
  else if(to.meta.guest && store.getters.isAuthenticated) next('/');
  else next();
})

export default router
