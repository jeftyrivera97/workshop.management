import { createSlice } from '@reduxjs/toolkit';

export const ingresoSlice = createSlice({
    name: 'ingreso',
    initialState: {
        moduleName: '',
        moduleTitle: '',
        tableHeaders: [],
        data: [],
        pagination: {},
        loading: false,
        status: 'not-loaded',
        errorMessage: undefined,
        counter: 0,
        totalMes: 'L.0',
        totalAnual: 'L.0',
        dataGraficaMes: [],
        totalMesAnterior: 'L.0',
        categoriasMes: [],
        tiposMes: [],
    },
    reducers: {
        onLoading: (state) => {
            state.loading = true;
            state.status = 'loading';
            state.errorMessage = undefined;
            state.data = [];
            state.pagination = {};
        },
        onFill: (state, { payload }) => {
            state.loading = false;
            state.errorMessage = undefined;
            state.status = 'loaded';
            state.moduleName = payload.moduleName || '';
            state.moduleTitle = payload.moduleTitle || '';
            state.data = payload.data || [];
            state.pagination = payload ||{} ;
            state.tableHeaders = payload.tableHeaders || [];
            state.counter = payload.contador || [];
            state.totalMes = payload.totalMes || 'L. 0';
            state.totalAnual = payload.totalAnual || 'L. 0';
            state.dataGraficaMes = payload.dataGraficaMes || [];
            state.totalMesAnterior = payload.totalMesAnterior || 'L. 0';
            state.tiposMes = payload.tiposMes || [];
            state.categoriasMes = payload.categoriasMes || [];
        },
        onError: (state, { payload }) => {
            state.loading = false;
            state.status = 'not-loaded';
            state.errorMessage = payload;
            state.moduleName = '';
            state.moduleTitle = '';
            state.data = [];
            state.pagination = {};
        },

    }
});


// Action creators are generated for each case reducer function
export const { onLoading, onFill, onError } = ingresoSlice.actions;
