<template>
  <section class="section">
    <dev class="container">
      <navbar />
      <router-view />
    </dev>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  }
});
</script>

<style>

</style>
