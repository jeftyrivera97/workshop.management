import { configureStore } from '@reduxjs/toolkit'
import { authSlice,ingresoSlice, compraSlice } from './';
import { gastoSlice } from './Gasto/gastoSlice';
import { planillaSlice } from './Planilla/planillaSlice';
import { homeSlice } from './Home/homeSlice';
import { servicioSlice } from './Servicio/servicioSlice';

// ...

export const store = configureStore({
  reducer: {
     auth: authSlice.reducer,
    ingreso: ingresoSlice.reducer,
    compra: compraSlice.reducer,
    gasto: gastoSlice.reducer,
    planilla: planillaSlice.reducer,
    home: homeSlice.reducer,
    servicio: servicioSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch