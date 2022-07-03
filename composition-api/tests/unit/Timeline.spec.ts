import { store } from "./../../src/store";
import { nextTick } from "vue";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import Timeline from "../../src/components/Timeline.vue";
import { today, thisWeek, thisMonth } from "../../src/mocks";

jest.mock("axios", () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  },
}));

function mountTimeline() {
  const testComponent = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    `,
  };
  return mount(testComponent, {
    global: {
      components: {
        RouterLink: RouterLinkStub,
      },
      plugins: [store],
    },
  });
}

describe("Timeline", () => {
  it("renders today post default", async () => {
    const wrapper = mountTimeline();

    await flushPromises(); // Immediately resolves all promises
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });

  it("updates when the period is clicked | week", async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    wrapper.get("[data-test='This Week']").trigger("click");
    // have to wait for requestAnimationFrame( () => ...) to exec
    await nextTick(); //Resolves Vue-internal promises

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("updates when the period is clicked | month", async () => {
    const wrapper = mountTimeline();
    await flushPromises();
    await wrapper.get("[data-test='This Month']").trigger("click"); // same as nextTick()

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  });
});
