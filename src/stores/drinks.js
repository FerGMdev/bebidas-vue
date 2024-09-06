import { defineStore } from "pinia";
import { ref, onMounted, reactive, computed } from "vue";
import APIService from "@/services/APIService";
import { useModalStore } from "@/stores/modal";

export const useDrinksStore = defineStore("drinks", () => {
  // Referencia reactiva para almacenar las categorías de bebidas
  const categories = ref([]);

  // Objeto reactivo para realizar búsquedas filtradas
  const search = reactive({
    name: "",
    category: "",
  });

  // Referencia reactiva para almacenar las recetas de bebidas
  const recipes = ref([]);

  // Referencia reactiva para almacenar los detalles de una receta específica
  const recipe = ref([]);

  // Se ejecuta cuando el componente se monta en el DOM
  onMounted(async function () {
    // Obtiene las categorías de bebidas desde el servicio APIService
    const {
      data: { drinks },
    } = await APIService.getCategories();

    // Asigna las categorías al estado
    categories.value = drinks;
  });

  // Función para obtener recetas de bebidas según los criterios de búsqueda
  async function getRecipes() {
    const {
      data: { drinks },
    } = await APIService.searchRecipes(search);
    recipes.value = drinks;
  }

  // Función para seleccionar una bebida específica por su ID
  async function selectDrink(idDrink) {
    const {
      data: { drinks },
    } = await APIService.getRecipeById(idDrink);

    // Asigna la primera receta encontrada a la referencia "recipe"
    recipe.value = drinks[0];

    // Llama a la función "handleModal" del store de modales para mostrar detalles en un modal
    useModalStore().handleModal(recipe.value);
  }

  const noRecipes = computed(() => {
    return recipes.value.length === 0;
  });

  // Devuelve las propiedades y funciones que estarán disponibles en el store
  return {
    categories,
    search,
    getRecipes,
    recipes,
    selectDrink,
    recipe,
    noRecipes,
  };
});
