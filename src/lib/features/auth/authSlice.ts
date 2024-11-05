// src/lib/authSlice.ts
import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    login: create.reducer((state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    }),
    logout: create.reducer((state) => {
      state.isAuthenticated = false;
      state.user = null;
    }),
  }),
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
  },
});

// Action creators are generated for each case reducer function.
export const { login, logout } = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIsAuthenticated, selectUser } = authSlice.selectors;

export default authSlice.reducer;