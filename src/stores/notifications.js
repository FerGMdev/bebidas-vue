import { ref, watch, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", () => {
  const notification = ref({
    show: false,
    message: "",
    type: "",
  });

  watchEffect(() => {
    if (notification.value.show) {
      setTimeout(() => {
        notification.value.show = false;
        notification.value.message = "";
        notification.value.type = "";
      }, 3000);
    }
  });

  return { notification };
});
