<template>
  <post-writer :post="newPost" />
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent } from "vue";
import { Post } from "../mocks";
import PostWriter from "./PostWriter.vue";

export default defineComponent({
  components: {
    PostWriter,
  },
  setup() {
    const newPost: Post = {
      id: "-1",
      title: "Enter your title...",
      created: moment(),
    };
  
    return {
      newPost,
    };
  },
});
</script>
