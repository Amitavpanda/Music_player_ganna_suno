import { configureStore } from "@reduxjs/toolkit";
import { shazamApi } from "./services/shazamCore";
import playerReducer from "./features/playerSlice";
import userReducer from "./features/userSlice";
export const store = configureStore({
  reducer: {
    player: playerReducer,
    user : userReducer,
    [shazamApi.reducerPath] : shazamApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(shazamApi.middleware),

});

