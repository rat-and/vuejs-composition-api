import { reactive, readonly, provide, inject, App } from "vue";
import axios from "axios";
import { Post, today, thisWeek, thisMonth } from "./mocks";

export interface User {
  id: string;
  username: string;
  password: string;
}

interface State {
  posts: PostsState;
}

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  loaded: boolean;
}

export const storeKey = Symbol("store");
class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  install(app: App) {
    app.provide(storeKey, this);
  }

  getState() {
    return readonly(this.state);
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>("/posts", post);
    this.state.posts.all.set(post.id, response.data);
    this.state.posts.ids.push(post.id);
  }

  async createUser(user: User) {
    // ...
    console.log(user);
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>("/posts");
    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: true,
    };

    for (const post of response.data) {
      postsState.ids.push(post.id);
      postsState.all.set(post.id, post);
    }
    this.state.posts = postsState;
  }
}

const all = new Map<string, Post>();
all.set(today.id, today);
all.set(thisWeek.id, thisWeek);
all.set(thisMonth.id, thisMonth);

export const store = new Store({
  posts: {
    all,
    ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false,
  },
});

export const emptyStore = () => {
  return new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false,
    },
  });
};

export function useStore(): Store {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw Error("Did you forget to call provide?");
  }
  return _store;
}
