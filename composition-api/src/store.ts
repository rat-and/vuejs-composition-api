import { reactive, readonly, inject, App } from "vue";
import axios from "axios";
import { Post, today, thisWeek, thisMonth } from "./mocks";

export interface User {
  id: string;
  username: string;
  password: string;
}

export type Author = Omit<User, "password">;

interface BaseState<T> {
  ids: string[];
  all: Map<string, T>;
  loaded: boolean;
}

type PostsState = BaseState<Post>;
interface AuthorsState extends BaseState<Author> {
  currentUserId: string | undefined;
}

export interface State {
  posts: PostsState;
  authors: AuthorsState;
}

export const storeKey = Symbol("store");
export class Store {
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
    this.state.posts.all.set(response.data.id, response.data);
    this.state.posts.ids.push(response.data.id);
  }

  async updatePost(post: Post) {
    const response = await axios.put<Post>("/posts", post);
    this.state.posts.all.set(response.data.id, response.data);
  }

  async createUser(user: User) {
    const response = await axios.post<Author>("/users", user);
    this.state.authors.all.set(response.data.id, response.data);
    this.state.authors.ids.push(response.data.id);
    this.state.authors.currentUserId = response.data.id;
    console.log(this.state.authors);
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
  authors: {
    all: new Map<string, Author>(),
    ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false,
    currentUserId: undefined,
  },
  posts: {
    all,
    ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false,
  },
});

export const emptyStore = (isUserAuthenticated = true) => {
  return new Store({
    authors: isUserAuthenticated
      ? {
          ids: ["100"],
          all: new Map<string, Author>([
            ["100", { id: "100", username: "username" }],
          ]),
          loaded: false,
          currentUserId: "100",
        }
      : {
          ids: [],
          all: new Map<string, Author>(),
          loaded: false,
          currentUserId: undefined,
        },
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
