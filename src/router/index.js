import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/products/create',
    name: 'New Product',
    component: () => import('../views/NewProduct.vue')
  },
  {
    path: '/products/:id/create',
    name: 'New Recipe',
    component: () => import('../views/NewRecipe.vue')
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => import(/* webpackChunkName: "ingredients" */ '../views/Ingredients.vue')
  },
  {
    path: '/ingredients/:id',
    name: 'Ingredient',
    component: () => import(/* webpackChunkName: "ingredients" */ '../views/Ingredient.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
