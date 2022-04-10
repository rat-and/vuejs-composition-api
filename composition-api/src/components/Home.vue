<template>
    <suspense>
        <template #default>
            <timeline />
        </template>
        <template #fallback>
            <spinner />
        </template>
    </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "./Timeline.vue";
import Spinner from "./Spinner.vue";

export default defineComponent({
    name: "Home",
    components: {
        Timeline,
        Spinner,
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
