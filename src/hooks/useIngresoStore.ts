/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import adminApi from '../api/adminApi';
import { onError, onFill, onLoading } from '../store';


export const useIngresoStore = () => {

    const { status, loading, data, errorMessage, pagination, tableHeaders, counter, moduleName, moduleTitle,totalMes,totalAnual, dataGraficaMes,totalMesAnterior, tiposMes, categoriasMes } = useSelector((state: any) => state.ingreso);
    const dispatch = useDispatch();

    const startLoading = async (page = 1, module = '') => {
        dispatch(onLoading());
        try {
            const token = localStorage.getItem('token');
            const resp = await adminApi.get(`/${module}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(resp);
            dispatch(onFill(resp.data));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            dispatch(onError("Error al cargar los datos: " + error.message));
            throw new Error("Error al cargar los datos: " + error.message);
        }
    }

    // const startRegister = async ({ email, password, name }: { email: string, password: string, name: string }) => {
    //     dispatch(onChecking());
    //     try {
    //         const { data } = await adminApi.post('/auth/new', { email, password, name });
    //         localStorage.setItem('token', data.token);
    //         dispatch(onLogin({ name: data.name, uid: data.uid }));

    //     } catch (error: any) {
    //         dispatch(onLogout(error.response.data?.msg || '--'));
    //         setTimeout(() => {
    //             dispatch(clearErrorMessage());
    //         }, 10);
    //     }
    // }





    return {
        //* Propiedades
        errorMessage,
        status,
        data,
        loading,
        pagination,
        tableHeaders,
        counter,
        moduleName,
        moduleTitle,
        totalMes,
        totalAnual,
        dataGraficaMes,
        totalMesAnterior,
        tiposMes,
        categoriasMes,

        //* Métodos
        startLoading,

    }

}