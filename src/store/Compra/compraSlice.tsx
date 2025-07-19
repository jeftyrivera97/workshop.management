import { createSlice } from "@reduxjs/toolkit";
import {
  CompraDataGraficaMes,
  CompraInfoTableData,
  CompraLinks,
  CompraMeta,
  CompraTableData,
} from "../../interfaces";

interface CompraState {
  moduleName: string;
  moduleTitle: string;
  tableHeaders: { [key: string]: string };
  tableData: CompraTableData[];
  pagination: {
    meta?: CompraMeta;
    links?: CompraLinks;
  };
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
  totalMes: string;
  totalAnual: string;
  totalMesAnterior: string;
  dataGraficaMes: CompraDataGraficaMes[];
  categoriasMes: CompraInfoTableData[];
  tiposMes: CompraInfoTableData[];
}

const initialState: CompraState = {
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

export const compraSlice = createSlice({
  name: "compra",
  initialState,
  reducers: {
    onCompraLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.tableData = [];
      state.pagination = {};
    },
    onCompraFill: (state, { payload }) => {
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
    onCompraError: (state, { payload }) => {
      state.loading = false;
      state.status = "not-loaded";
      state.errorMessage = payload;
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
export const { onCompraLoading, onCompraFill, onCompraError } =
  compraSlice.actions;
