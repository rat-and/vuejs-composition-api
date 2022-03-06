import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import Timeline from "../../src/components/Timeline.vue";
import { today, thisWeek, thisMonth } from "../../src/mocks";

describe("Timeline", () => {
  it("renders today post default", () => {
    const wraper = mount(Timeline);
    // Check if rendered html contains today's post
    expect(wraper.html()).toContain(today.created.format("Do MMM"));
  });

  it("updates when the period is clicked | week", async () => {
    const wraper = mount(Timeline);
    // console.log(wraper.get("[data-test='This Week']"));
    wraper.get("[data-test='This Week']").trigger("click");
    // have to wait for requestAnimationFrame( () => ...) to exec
    await nextTick();

    // Check if rendered html contains this week's posts
    expect(wraper.html()).toContain(today.created.format("Do MMM"));
    expect(wraper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("updates when the period is clicked | month", async () => {
    const wraper = mount(Timeline);
    await wraper.get("[data-test='This Month']").trigger("click");

    // Check if rendered html contains this week's posts
    expect(wraper.html()).toContain(today.created.format("Do MMM"));
    expect(wraper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wraper.html()).toContain(thisMonth.created.format("Do MMM"));
  });
});
