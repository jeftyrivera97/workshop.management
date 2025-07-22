import { configureStore } from '@reduxjs/toolkit'
import { authSlice,ingresoSlice, compraSlice } from './';
import { gastoSlice } from './Gasto/gastoSlice';
import { planillaSlice } from './Planilla/gastoSlice';

// ...

export const store = configureStore({
  reducer: {
     auth: authSlice.reducer,
    ingreso: ingresoSlice.reducer,
    compra: compraSlice.reducer,
    gasto: gastoSlice.reducer,
    planilla: planillaSlice.reducer // Asegúrate de importar y agregar el slice de planilla
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch