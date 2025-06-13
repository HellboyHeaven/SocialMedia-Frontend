import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getPosts, getPostById } from "shared/api/post";

import { normalize, schema } from "normalizr";
import { userAdapter, userEntity } from "shared/slices/userSlice"; // Импортируем схему пользователей

// Определяем схему постов, где `sender` — это пользователь
export const postEntity = new schema.Entity("posts", {
  sender: userEntity,
});
export const postAdapter = createEntityAdapter<Post>();

// Загружаем список всех постов
export const fetchPosts = createAsyncThunk("posts/get", async () => {
  const response = await getPosts();
  const normalized = normalize(response.data, [postEntity]);
  return {
    posts: normalized.entities.posts || {},
    users: normalized.entities.users || {}, // Загружаем пользователей из постов
  };
});

// Загружаем один пост по ID
export const fetchPostById = createAsyncThunk(
  "posts/getById",
  async (id: string) => {
    const response = await getPostById(id);
    const normalized = normalize(response.data, postEntity);
    return {
      posts: normalized.entities.posts || {},
      users: normalized.entities.users || {},
    };
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: postAdapter.getInitialState(),
    users: userAdapter.getInitialState(), // Добавляем состояние для пользователей
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      postAdapter.upsertMany(state.posts, action.payload.posts);
      userAdapter.upsertMany(state.users, action.payload.users);
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      postAdapter.upsertMany(state.posts, action.payload.posts);
      userAdapter.upsertMany(state.users, action.payload.users);
    });
  },
});

export default postsSlice.reducer;
