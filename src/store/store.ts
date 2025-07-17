import { configureStore } from '@reduxjs/toolkit';
import { authSlice,ingresoSlice } from './';



export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingreso: ingresoSlice.reducer,
    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
