import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getUsers, getUserById } from "shared/api/user";
import { normalize, schema } from "normalizr";

// Определяем схему пользователей
export const userEntity = new schema.Entity("users");
export const userAdapter = createEntityAdapter<User>();

// Загружаем список всех пользователей
export const fetchUsers = createAsyncThunk("users/get", async () => {
  const response = await getUsers();
  const normalized = normalize(response.data, [userEntity]); // Нормализуем массив пользователей
  return { users: normalized.entities.users || {} };
});

// Загружаем одного пользователя по ID
export const fetchUserById = createAsyncThunk(
  "users/getById",
  async (id: string) => {
    const response = await getUserById(id);
    const normalized = normalize(response.data, userEntity); // Нормализуем одного пользователя
    return { users: normalized.entities.users || {} };
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      userAdapter.upsertMany(state, action.payload.users);
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      userAdapter.upsertMany(state, action.payload.users);
    });
  },
});

export default usersSlice.reducer;
