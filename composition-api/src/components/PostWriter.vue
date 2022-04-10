<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
import { parse } from "marked";
import { Post } from "../mocks";

export default defineComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const title = ref(props.post.title);
    const content = ref("## Title\nEnter your content");
    const html = ref("");
    const contentEditable = ref<HTMLDivElement | null>(null);

    watchEffect(() => {
      html.value = parse(content.value);
    });

    const handleInput = () => {
      content.value = contentEditable.value?.textContent || "";
    };

    onMounted(() => {
      if (!contentEditable.value) {
        throw Error("This error should never happen");
      }
      contentEditable.value.textContent = content.value;
    });

    return {
      content,
      contentEditable,
      html,
      title,

      handleInput,
    };
  },
});
</script>
