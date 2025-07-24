import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ServicioData,
  ServicioTableData,
  ServicioMeta,
  ServicioLinks,
  ServicioDataGraficaMes,
  ServicioInfoTableData,
} from "../../interfaces/Servicio";

interface ServicioState {
  moduleName: string;
  moduleTitle: string;
  tableHeaders: { [key: string]: string };
  tableData: ServicioTableData[];
  pagination: {
    meta?: ServicioMeta;
    links?: ServicioLinks;
  };
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
  totalMes: string;
  totalAnual: string;
  totalMesYearAnterior: string;
  dataGraficaMes: ServicioDataGraficaMes[];
  categoriasMes: ServicioInfoTableData[];
  tiposMes: ServicioInfoTableData[];
}

const initialState: ServicioState = {
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
  totalMesYearAnterior: "L.0",
  dataGraficaMes: [],
  categoriasMes: [],
  tiposMes: [],
};

export const servicioSlice = createSlice({
  name: "ingreso",
  initialState,
  reducers: {
    onServicioLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.tableData = [];
      state.pagination = {};
    },

    onServicioFill: (state, action: PayloadAction<ServicioData>) => {
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
      state.totalMesYearAnterior = payload.totalMesYearAnterior || "L. 0";
      state.tiposMes = payload.tiposMes || [];
      state.categoriasMes = payload.categoriasMes || [];
    },
    onServicioError: (state, action: PayloadAction<string>) => {
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
      state.totalMesYearAnterior = "L.0";
      state.tiposMes = [];
      state.categoriasMes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { onServicioLoading, onServicioFill, onServicioError } =
  servicioSlice.actions;
