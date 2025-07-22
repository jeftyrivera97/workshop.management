import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PlanillaData,
  PlanillaTableData,
  PlanillaMeta,
  PlanillaLinks,
  PlanillaDataGraficaMes,
  PlanillaInfoTableData,
  PlanillaAnalisisMensual,
} from "../../interfaces/Planilla";

interface PlanillaState {
  moduleName: string;
  moduleTitle: string;
  tableHeaders: { [key: string]: string };
  tableData: PlanillaTableData[];
  pagination: {
    meta?: PlanillaMeta;
    links?: PlanillaLinks;
  };
  loading: boolean;
  status: string;
  errorMessage: string | undefined;
  counter: number;
  totalMes: string;
  totalAnual: string;
  totalMesYearAnterior: string;
  dataGraficaMes: PlanillaDataGraficaMes[];
  categoriasMes: PlanillaInfoTableData[];
  tiposMes: PlanillaInfoTableData[];
  analisisMensual: PlanillaAnalisisMensual[] | null; // Ajusta el tipo según tu necesidad
}

const initialState: PlanillaState = {
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
  analisisMensual: [],
};

export const planillaSlice = createSlice({
  name: "Planilla",
  initialState,
  reducers: {
    onPlanillaLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.errorMessage = undefined;
      state.tableData = [];
      state.pagination = {};
    },

    onPlanillaFill: (state, action: PayloadAction<PlanillaData>) => {
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
      state.analisisMensual = payload.analisisMensual || null; // Asegúrate de que este campo exista en tu payload
    },
    onPlanillaError: (state, action: PayloadAction<string>) => {
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
      state.analisisMensual = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onPlanillaLoading, onPlanillaFill, onPlanillaError } =
  planillaSlice.actions;
