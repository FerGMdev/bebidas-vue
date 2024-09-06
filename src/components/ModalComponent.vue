<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useModalStore } from "@/stores/modal";
import { useDrinksStore } from "@/stores/drinks";
import { useFavoritesStore } from "@/stores/favorites";

const modalStore = useModalStore();
const drinksStore = useDrinksStore();
const favoritesStore = useFavoritesStore();
const formatIngredients = () => {
  const ingredientsDiv = document.createElement("DIV");
  for (let i = 1; i <= 15; i++) {
    if (drinksStore.recipe[`strIngredient${i}`]) {
      const ingredient = drinksStore.recipe[`strIngredient${i}`];
      const measure = drinksStore.recipe[`strMeasure${i}`];

      const ingredients = `${ingredient} ${measure ? "- " + measure : ""}`;
      const ingredientElement = document.createElement("P");
      ingredientElement.classList.add("text-md");
      ingredientElement.textContent = ingredients;
      ingredientsDiv.appendChild(ingredientElement);
    }
  }
  return ingredientsDiv;
};
</script>

<template>
  <TransitionRoot as="template" :show="modalStore.modal">
    <Dialog as="div" class="relative z-10" @close="modalStore.handleModal()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle
                    as="h3"
                    class="text-2xl font-bold mb-4 text-center"
                  >
                    {{ drinksStore.recipe.strDrink }}
                  </DialogTitle>
                  <img
                    :src="drinksStore.recipe.strDrinkThumb"
                    :alt="drinksStore.recipe.strDrink"
                    class="rounded-lg"
                  />
                  <DialogTitle as="h3" class="text-2xl font-bold mt-4">
                    Ingredientes
                  </DialogTitle>
                  <div v-html="formatIngredients().outerHTML"></div>
                  <div class="mt-2">
                    <DialogTitle as="h3" class="text-2xl font-bold">
                      Instrucciones
                    </DialogTitle>
                    <p class="text-lg lowercase text-gray-500">
                      {{ drinksStore.recipe.strInstructions }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="bg-slate-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-slate-600 transition-all duration-300"
                  @click="modalStore.handleModal()"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="bg-orange-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-orange-600 transition-all duration-300"
                  @click="favoritesStore.handleClickFavorites()"
                >
                  {{ modalStore.favoriteButton }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
