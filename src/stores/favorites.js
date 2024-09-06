import { defineStore } from "pinia";
import { useDrinksStore } from "@/stores/drinks";
import { useModalStore } from "@/stores/modal";
import { useNotificationStore } from "@/stores/notifications";
import { ref, watch, onMounted, computed } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref([]);
  const drinksStore = useDrinksStore();
  const modalStore = useModalStore();
  const notificationStore = useNotificationStore();
  onMounted(() => {
    favorites.value = JSON.parse(localStorage.getItem("favorites")) ?? [];
  });

  watch(favorites, () => syncFavorites(), { deep: true });

  const syncFavorites = () => {
    // Guardar en el localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  // Verificar si es favorito
  const isFavorite = () => {
    const favoriteLocal = JSON.parse(localStorage.getItem("favorites")) ?? [];
    return favoriteLocal.some(
      (favorite) => favorite.idDrink === drinksStore.recipe.idDrink
    );
  };

  // Eliminar de favoritos
  function removeFavorite() {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.idDrink !== drinksStore.recipe.idDrink
    );
    notificationStore.notification.show = true;
    notificationStore.notification.message = "Eliminado de favoritos";
    notificationStore.notification.type = "success";
  }

  function addFavorite() {
    favorites.value.push(drinksStore.recipe);
    notificationStore.notification.show = true;
    notificationStore.notification.message = "Agregado a favoritos";
    notificationStore.notification.type = "success";
  }

  const handleClickFavorites = () => {
    if (isFavorite()) {
      removeFavorite();
    } else {
      addFavorite();
    }
    // Cerrar el modal
    modalStore.handleModal();

    setTimeout(() => {
      notificationStore.$reset();
    }, 3000);
  };

  const noFavorites = computed(() => {
    return favorites.value.length === 0;
  });

  return { favorites, handleClickFavorites, isFavorite, noFavorites };
});
