import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites";
import { useDrinksStore } from "@/stores/drinks";

export const useModalStore = defineStore("modal", () => {
  const modal = ref(false);
  const favoritesStore = useFavoritesStore();
  const drinksStore = useDrinksStore();

  function handleModal() {
    modal.value = !modal.value;
  }

  const favoriteButton = computed(() => {
    return favoritesStore.isFavorite(drinksStore.recipe.idDrink)
      ? "Eliminar de favoritos"
      : "Agregar a favoritos";
  });

  return {
    modal,
    handleModal,
    favoriteButton,
  };
});
