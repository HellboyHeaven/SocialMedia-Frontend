import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "shared/slices/postSlice";
import usersReducer from "shared/slices/userSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
