import { mount } from "@vue/test-utils";
import Navbar from "./../../src/components/Navbar.vue";
import Signup from "./../../src/components/Signup.vue";
import { emptyStore } from "./../../src/store";

describe("Navbar", () => {
  it("shows a signup modal via teleport", async () => {
    const store = emptyStore(false);

    const element = document.createElement("div");
    element.id = "modal";
    document.body.appendChild(element);

    const wrapper = mount(Navbar, {
      attachTo: document.body,
      global: {
        components: {
          RouterLink: {
            template: `<div></div>`,
          },
        },
        plugins: [store],
      },
    });

    await wrapper.get('[data-test="sign-up"]').trigger("click");
    const form = wrapper.getComponent(Signup);

    await form.get("#Username").setValue("TooLongUserName");
    expect(document.body.outerHTML).toContain(
      "The value must be between 2 and 10"
    );

    await form.get("#Username").setValue("UserName");
    expect(document.body.outerHTML).not.toContain(
      "The value must be between 2 and 10"
    );

    await form.trigger("submit.prevent");
  });
});
