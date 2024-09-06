import api from "@/lib/axios";

export default {
  getCategories() {
    return api("/list.php?c=list");
  },
  searchRecipes({ category, name }) {
    if (name) {
      return api(`/search.php?s=${name}`).then((response) => {
        console.log("API response:", response.data);
        const drinks = response.data.drinks || [];
        const filteredRecipes = category
          ? drinks.filter(
              (drink) =>
                drink.strCategory.toLowerCase() === category.toLowerCase()
            )
          : drinks;
        console.log("Filtered recipes:", filteredRecipes);
        return { data: { drinks: filteredRecipes } };
      });
    } else if (category) {
      return api(`/filter.php?c=${category}`);
    }
    return Promise.resolve({ data: { drinks: [] } });
  },
  getRecipeById(id) {
    return api(`/lookup.php?i=${id}`);
  },
};
