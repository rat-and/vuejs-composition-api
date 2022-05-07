import { nextTick } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
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
  return mount({
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
  });
}

describe("Timeline", () => {
  it("renders today post default", async () => {
    const wraper = mountTimeline();

    await flushPromises(); // Immediately resolves all promises
    expect(wraper.html()).toContain(today.created.format("Do MMM"));
  });

  it("updates when the period is clicked | week", async () => {
    const wraper = mountTimeline();
    await flushPromises();

    wraper.get("[data-test='This Week']").trigger("click");
    // have to wait for requestAnimationFrame( () => ...) to exec
    await nextTick(); //Resolves Vue-internal promises

    expect(wraper.html()).toContain(today.created.format("Do MMM"));
    expect(wraper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("updates when the period is clicked | month", async () => {
    const wraper = mountTimeline();
    await flushPromises();
    await wraper.get("[data-test='This Month']").trigger("click"); // same as nextTick()

    expect(wraper.html()).toContain(today.created.format("Do MMM"));
    expect(wraper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wraper.html()).toContain(thisMonth.created.format("Do MMM"));
  });
});
