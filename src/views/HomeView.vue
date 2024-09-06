<script setup>
import { useDrinksStore } from "@/stores/drinks";
import RecipeComponent from "@/components/RecipeComponent.vue";
const drinksStore = useDrinksStore();
</script>

<template>
  <h1 class="text-4xl extra-bold">Recetas</h1>
  <div v-if="drinksStore.noRecipes" class="text-center text-gray-500 text-lg">
    No hay recetas
  </div>
  <div
    v-else
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10"
  >
    <RecipeComponent
      v-for="recipe in drinksStore.recipes"
      :key="recipe.idDrink"
      :recipe="recipe"
    />
  </div>
</template>
