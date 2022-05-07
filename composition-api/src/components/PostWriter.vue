<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" data-test="title" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div
        contenteditable
        ref="contentEditable"
        @input="handleInput"
        data-test="content"
      />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="save" data-test="submit">
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { marked } from "marked";
import { Post } from "../mocks";
import highlight from "highlight.js";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  emits: {
    save: (post: Post) => {
      return true;
    },
  },
  setup(props, ctx) {
    const title = ref(props.post.title);
    const content = ref("## Title\nEnter your content");
    const html = ref("");
    const contentEditable = ref<HTMLDivElement | null>(null);

    const parseHtml = (str: string) => {
      html.value = marked(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value;
        },
      });
    };

    watch(
      content,
      debounce((newVal) => {
        parseHtml(newVal);
      }, 250),
      { immediate: true }
    );

    const handleInput = () => {
      content.value = contentEditable.value?.innerText || "";
    };

    onMounted(() => {
      if (!contentEditable.value) {
        throw Error("This error should never happen");
      }
      contentEditable.value.innerText = content.value;
    });

    const save = () => {
      const newPost: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: content.value,
      };

      ctx.emit("save", newPost);
    };

    return {
      content,
      contentEditable,
      html,
      title,

      handleInput,
      save,
    };
  },
});
</script>

<style>
.column {
  overflow-y: scroll;
}
</style>
