import { configureStore } from "@reduxjs/toolkit";
import { shazamApi } from "./services/shazamCore";
import playerReducer from "./features/playerSlice";
export const store = configureStore({
  reducer: {
    player: playerReducer,
    [shazamApi.reducerPath] : shazamApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(shazamApi.middleware),

});

