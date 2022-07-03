import ShowPost from "@/components/ShowPost.vue";
import { today } from "@/mocks";
import { routerWithStore } from "@/router";
import { Store } from "@/store";
import { mount, flushPromises } from "@vue/test-utils";

describe("ShowPost", () => {
  it("does not show edit button when not authenticated", async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true,
      },
      authors: {
        ids: [],
        all: new Map(),
        loaded: true,
        currentUserId: undefined,
      },
    });

    const router = routerWithStore(store);
    router.push(`/posts/${today.id}`);
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false);
  });

  it("does not show edit button when not authorized", async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true,
      },
      authors: {
        ids: ["10000"],
        all: new Map([
          [
            "20000",
            {
              id: "20000",
              username: "unauthorized",
            },
          ],
        ]),
        loaded: true,
        currentUserId: undefined,
      },
    });

    const router = routerWithStore(store);
    router.push(`/posts/${today.id}`);
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false);
  });

  it("shows edit button when authorized", async () => {
    const store = new Store({
        posts: {
          ids: [today.id],
          all: new Map([[today.id, today]]),
          loaded: true,
        },
        authors: {
          ids: ["1"],
          all: new Map([
            [
              "1",
              {
                id: "1",
                username: "authorized",
              },
            ],
          ]),
          loaded: true,
          currentUserId: "1",
        },
      });
  
      const router = routerWithStore(store);
      router.push(`/posts/${today.id}`);
      await router.isReady();
  
      const wrapper = mount(ShowPost, {
        global: {
          plugins: [store, router],
        },
      });
  
      await flushPromises();
      expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(true);
  });
});
