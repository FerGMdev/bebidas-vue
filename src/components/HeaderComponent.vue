<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";
import { useDrinksStore } from "@/stores/drinks";
import { useNotificationStore } from "@/stores/notifications";

// Get the current route object
const route = useRoute();
const drinksStore = useDrinksStore();
const notificationStore = useNotificationStore();
// Compute whether the current page is the home page
// This will reactively update whenever the route changes
const isHomePage = computed(() => route.name === "home");

const handleSubmit = () => {
  console.log(drinksStore.search);
  drinksStore.getRecipes();

  // Validar que los campos no esten vacios
  if (Object.values(drinksStore.search).some((value) => value === "")) {
    notificationStore.notification.show = true;
    notificationStore.notification.message =
      "Todos los campos son obligatorios";
    notificationStore.notification.type = "error";
    return;
  }
};
</script>

<template>
  <header class="bg-slate-800" :class="{ header: isHomePage }">
    <div class="container mx-auto px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img src="/img/logo.svg" alt="Logotipo" class="w-32" />
          </RouterLink>
        </div>

        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'home' }"
            class="uppercase font-bold hover:text-orange-500 transition-all duration-300"
            active-class="text-orange-500"
          >
            Inicio
          </RouterLink>
          <RouterLink
            :to="{ name: 'favorites' }"
            class="uppercase font-bold hover:text-orange-500 transition-all duration-300"
            active-class="text-orange-500"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>

      <form
        v-if="isHomePage"
        class="md:w-1/2 2xl:w-1/3 bg-white rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-yellow-400 p-10 my-32 shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label for="ingrediente" class="text-xl font-bold text-white"
            >Nombre o Ingredientes
          </label>
          <input
            type="text"
            placeholder="Nombre o Ingredientes"
            id="ingrediente"
            class="w-full p-3 bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-yellow-400 text-white placeholder:text-orange-500 outline-none"
            v-model="drinksStore.search.name"
          />
        </div>
        <div class="space-y-4">
          <label for="categoria" class="text-xl font-bold text-white"
            >Categoria
          </label>
          <select
            name="categoria"
            id="categoria"
            class="w-full p-3 bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-yellow-400 text-orange-500 placeholder:text-orange-500"
            v-model="drinksStore.search.category"
          >
            <option value="">Seleccione una categoria</option>
            <option
              v-for="category in drinksStore.categories"
              :key="category.idCategory"
              :value="category.strCategory"
            >
              {{ category.strCategory }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full p-3 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-yellow-400 text-orange-500"
        >
          Buscar Receta
        </button>
      </form>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
