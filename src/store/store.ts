import { configureStore } from '@reduxjs/toolkit';
import { authSlice,ingresoSlice, compraSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingreso: ingresoSlice.reducer,
    compra: compraSlice.reducer,
    // ...other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
