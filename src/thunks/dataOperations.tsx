import { useDispatch } from 'react-redux';
import { adminApi } from "../api";
import { onLoading, onFill, onError } from "../store";




export const dataOperations = () => {

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
        } catch (error: any) {
            dispatch(onError("Error al cargar los datos: " + error.message));
            throw new Error("Error al cargar los datos: " + error.message);
        }
    }


    return {

        // Propiedades

        //* Métodos
        startLoading,

    
    };


}
