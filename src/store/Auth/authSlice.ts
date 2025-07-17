import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'authenticated','not-authenticated',
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLoginWindow: (state) => {
            state.user = {};
            state.errorMessage = undefined;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }, 
        onErrorLogin: (state, { payload }) => {
            state.errorMessage = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage, onErrorLogin, onLoginWindow } = authSlice.actions;
export default authSlice.reducer;