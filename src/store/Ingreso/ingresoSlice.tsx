import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IngresoData,
  IngresoTableData,
  IngresoMeta,
  IngresoLinks,
  IngresoDataGraficaMes,
  IngresoInfoTableData,
} from "../../interfaces/Ingreso";

interface IngresoState {
  moduleName: string;
  moduleTitle: string;
  tableHeaders: { [key: string]: string };
  tableData: IngresoTableData[];
  pagination: {
    meta?: IngresoMeta;
    links?: IngresoLinks;
  };
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
  totalMes: string;
  totalAnual: string;
  totalMesAnterior: string;
  dataGraficaMes: IngresoDataGraficaMes[];
  categoriasMes: IngresoInfoTableData[];
  tiposMes: IngresoInfoTableData[];
}

const initialState: IngresoState = {
  moduleName: "",
  moduleTitle: "",
  tableHeaders: {},
  tableData: [],
  pagination: {},
  loading: false,
  status: "not-loaded",
  errorMessage: undefined,
  counter: 0,
  totalMes: "L.0",
  totalAnual: "L.0",
  totalMesAnterior: "L.0",
  dataGraficaMes: [],
  categoriasMes: [],
  tiposMes: [],
};

export const ingresoSlice = createSlice({
  name: "ingreso",
  initialState,
  reducers: {
    onIngresoLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.tableData = [];
      state.pagination = {};
    },
  
    onIngresoFill: (state, action: PayloadAction<IngresoData>) => {
      const { payload } = action;

      state.loading = false;
      state.errorMessage = undefined;
      state.status = "loaded";
      state.moduleName = payload.moduleName || "";
      state.moduleTitle = payload.moduleTitle || "";
      state.tableData = payload.data || [];
      state.pagination = {
        meta: payload.meta,
        links: payload.links,
      };
      state.tableHeaders = payload.tableHeaders || {};
      state.counter = payload.contador || 0;
      state.totalMes = payload.totalMes || "L. 0";
      state.totalAnual = payload.totalAnual || "L. 0";
      state.dataGraficaMes = payload.dataGraficaMes || [];
      state.totalMesAnterior = payload.totalMesAnterior || "L. 0";
      state.tiposMes = payload.tiposMes || [];
      state.categoriasMes = payload.categoriasMes || [];
    },
    onIngresoError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.status = "not-loaded";
      state.errorMessage = action.payload;
      state.moduleName = "";
      state.moduleTitle = "";
      state.tableData = [];
      state.pagination = {};
      state.tableHeaders = {};
      state.counter = 0;
      state.totalMes = "L.0";
      state.totalAnual = "L.0";
      state.dataGraficaMes = [];
      state.totalMesAnterior = "L.0";
      state.tiposMes = [];
      state.categoriasMes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { onIngresoLoading, onIngresoFill, onIngresoError } =
  ingresoSlice.actions;
