import { shallowMount } from "@vue/test-utils";
import Timeline from "@/components/Timeline.vue";

describe("Timeline.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Timeline, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
