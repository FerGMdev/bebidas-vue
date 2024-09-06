<script setup>
import RecipeComponent from "@/components/RecipeComponent.vue";
import { useFavoritesStore } from "@/stores/favorites";

const favoritesStore = useFavoritesStore();
</script>

<template>
  <h1 class="text-4xl extra-bold">Favoritos</h1>
  <div
    v-if="favoritesStore.noFavorites"
    class="text-center text-gray-500 text-lg"
  >
    No tienes favoritos
  </div>
  <div
    v-else
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10"
  >
    <RecipeComponent
      v-for="recipe in favoritesStore.favorites"
      :key="recipe.idDrink"
      :recipe="recipe"
      :is-favorite="favoritesStore.isFavorite(recipe.idDrink)"
    />
  </div>
</template>
