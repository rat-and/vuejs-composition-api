import { flushPromises, mount } from "@vue/test-utils";
import PostWriter from "../../src/components/PostWriter.vue";

describe("PostWriter", () => {
  it("emits a seve event with the new post", async (done) => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          title: "New Title",
        },
      },
    });
    const newTitle = "My Test Title";
    const NewContent = "## New content";

    await wrapper.find('[data-test="title"').setValue(newTitle);

    const $content = wrapper.find<HTMLDivElement>('[data-test="content"');
    $content.element.innerText = NewContent;
    await $content.trigger("input");

    setTimeout(async () => {
      await wrapper.find('[data-test="submit"').trigger("click");

      const emitted = (wrapper.emitted()["save"] as any)[0][0];

      expect(emitted.title).toBe(newTitle);
      expect(emitted.markdown).toBe(NewContent);
      expect(emitted.html).toBe('<h2 id="new-content">New content</h2>\n');
      done();
    }, 300);
  });
});
