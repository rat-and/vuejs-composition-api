<template>
  <post-writer :post="newPost" @save="save" />
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

    const save = (post: Post) => {
      console.log("post", post);
    };

    return {
      newPost,

      save,
    };
  },
});
</script>
