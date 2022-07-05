import { Post, today } from "../../src/mocks";
import { Store, State } from "../../src/store";

const mockPost: Post = {
  ...today,
};

jest.mock("axios", () => ({
  get: () => {
    return {
      data: [mockPost],
    };
  },
}));

describe("store/fetchPosts", () => {
  it("fetches post and updates state", async () => {
    const store = new Store({
      posts: {
        ids: [],
        all: new Map(),
        loaded: true,
      },
      authors: {
        ids: [],
        all: new Map(),
        currentUserId: undefined,
        loaded: true,
      },
    });

    await store.fetchPosts();
    const expected: State = {
      posts: {
        ids: ["1"],
        all: new Map([["1", mockPost]]),
        loaded: true,
      },
      authors: {
        ids: [],
        all: new Map(),
        currentUserId: undefined,
        loaded: true,
      },
    };

    expect(expected).toEqual(store.getState());
  });
});
