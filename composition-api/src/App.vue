<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" @click="hide"></button>
  </div>

  <section class="section">
    <div class="container">
      <navbar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Navbar from "./components/Navbar.vue";
import { useModal } from "./useModal";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const modal = useModal();
    const style = computed(() => {
      return {
        display: modal.show.value ? "block" : "none",
      };
    });

    return {
      style,

      hide: () => {
        modal.hideModal();
      },
    };
  },
});
</script>

<style></style>
