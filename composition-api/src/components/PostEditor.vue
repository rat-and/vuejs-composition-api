<template>Editor</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store";

export default defineComponent({
  name: "PostViewer",
  async setup() {
    const store = useStore();
    const id = useRoute().params.id as string;
    const router = useRouter();

    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }

    const post = store.getState().posts.all.get(id);

    if (!post) {
      throw Error("Post was not found!");
    }

    if (post.authorId !== store.getState().authors.currentUserId) {
      router.push("/");
    }

    return {
      post,
    };
  },
});
</script>

<style scoped></style>
