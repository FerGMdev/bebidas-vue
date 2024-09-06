<script setup>
import { useDrinksStore } from "@/stores/drinks";
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});

const drinksStore = useDrinksStore();
</script>
<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <div class="flex justify-center">
      <img
        :src="recipe.strDrinkThumb"
        :alt="recipe.strDrink"
        class="w-full h-48 object-cover rounded-lg hover:scale-110 transition-all duration-300 hover:rotate-1"
      />
    </div>
    <div class="p-5">
      <h2 class="text-xl font-bold text-center mt-4 truncate">
        {{ recipe.strDrink }}
      </h2>
      <button
        type="button"
        class="bg-slate-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-slate-600 transition-all duration-300"
        @click="drinksStore.selectDrink(recipe.idDrink)"
      >
        Ver receta
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
