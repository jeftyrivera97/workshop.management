import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeData } from "../../interfaces/Home";

interface HomeState extends HomeData {
  loading: boolean;
  status: string;
  errorMessage?: string;
}

const initialState: HomeState = {
  loading: false,
  status: "not-loaded",
  errorMessage: undefined,
  moduleName: "",
  moduleTitle: "",
  totales: {
    ingresosAnualActual: 0,
    comprasAnualActual: 0,
    gastosAnualActual: 0,
    balanceAnual: 0,
    ingresosAnualAnterior: 0,
    comprasAnualAnterior: 0,
    gastosAnualAnterior: 0,
    balanceAnterior: 0,
    egresosAnualActual: 0,
    egresosAnualAnterior: 0,
  },
  porcentajes: {
    margen_ganancia_actual: 0,
    margen_ganancia_anterior: 0,
    porcentaje_egresos_actual: 0,
    porcentaje_egresos_anterior: 0,
    porcentaje_compras: 0,
    porcentaje_gastos: 0,
  },
  balances: {
    balance_anual: 0,
    estado_balance: "",
    color_balance: "",
    icono_balance: "",
  },
  variaciones: {
    variacion_ingresos: 0,
    variacion_egresos: 0,
    variacion_balance: 0,
    variacion_margen: 0,
    tendencia_ingresos: "",
    tendencia_egresos: "",
    tendencia_balance: "",
    tendencia_margen: "",
  },
  eficiencia: {
    eficiencia_compras: "0%",
    color_eficiencia: "",
  },
  rentabilidad: {
    clasificacion_rentabilidad: "",
    mensaje_rentabilidad: "",
    recomendacion_rentabilidad: "",
  },
  dataGraficaIngresos: [],
  dataGraficaEgresos: [],
  categoriasIngresosAnual: [],
  categoriasComprasAnual: [],
  categoriasGastosAnual: [],
};

export const homeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    onHomeLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
    },
    onHomeFill: (state, action: PayloadAction<HomeData>) => {
      state.loading = false;
      state.status = "loaded";
      state.moduleName = action.payload.moduleName;
      state.moduleTitle = action.payload.moduleTitle;
      state.errorMessage = undefined;
      state.totales = action.payload.totales;
      state.balances = action.payload.balances;
      state.porcentajes = action.payload.porcentajes;
      state.variaciones = action.payload.variaciones;
      state.eficiencia = action.payload.eficiencia;
      state.rentabilidad = action.payload.rentabilidad;
      state.dataGraficaIngresos = action.payload.dataGraficaIngresos || [];
      state.dataGraficaEgresos = action.payload.dataGraficaEgresos || [];
      state.categoriasIngresosAnual = action.payload.categoriasIngresosAnual || [];
      state.categoriasComprasAnual = action.payload.categoriasComprasAnual || [];
      state.categoriasGastosAnual = action.payload.categoriasGastosAnual || [];
    },
    onHomeError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.status = "error";
      state.errorMessage = action.payload;
      state.balances = initialState.balances;
      state.porcentajes = initialState.porcentajes;
      state.variaciones = initialState.variaciones;
      state.eficiencia = initialState.eficiencia;
      state.rentabilidad = initialState.rentabilidad;
      state.dataGraficaIngresos = [];
      state.dataGraficaEgresos = [];
      state.categoriasIngresosAnual = [];
      state.categoriasComprasAnual = [];
      state.categoriasGastosAnual = [];
      state.moduleName = "";
      state.moduleTitle = "";
      state.totales = initialState.totales;
    },
  },
});

export const { onHomeLoading, onHomeFill, onHomeError } = homeSlice.actions;
export default homeSlice.reducer;
