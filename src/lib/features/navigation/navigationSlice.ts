// src/lib/navigationSlice.ts
import { createAppSlice } from "@/lib/createAppSlice";

//profile drawer, basically just a toggle
interface NavigationState {
  showProfileSettings: boolean;
}

const initialState: NavigationState = {
  showProfileSettings: false,
};

export const navigationSlice = createAppSlice({
  name: "navigation",
  initialState,
  reducers: (create) => ({
    toggleProfileSettings: create.reducer((state) => {
      state.showProfileSettings = !state.showProfileSettings;
    }),
  }),
  selectors: {
    selectProfileSettings: (state) => state.showProfileSettings,
  },
});

export const { toggleProfileSettings } = navigationSlice.actions;

export const { selectProfileSettings } = navigationSlice.selectors;

export default navigationSlice.reducer;

