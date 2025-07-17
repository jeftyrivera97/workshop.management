import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout, onErrorLogin, onLoginWindow } from '../store/Auth/authSlice';
import adminApi from '../api/adminApi';


export const useAuthStore = () => {

    const { status, user, errorMessage} = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }: { email: string, password: string }) => {
        dispatch(onChecking());
        try {
            const { data } = await adminApi.post('/login', { email, password });
            localStorage.setItem('token', data.access_token);
            dispatch(onLogin({ name: data.user.name, id: data.user.id }));
            console.log("Iniciado sesion correctamente");


        } catch (error: any) {
            dispatch(onLogout());
            dispatch(onErrorLogin("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }//

    const startRegister = async ({ email, password, name }: { email: string, password: string, name: string }) => {
        dispatch(onChecking());
        try {
            const { data } = await adminApi.post('/auth/new', { email, password, name });
            localStorage.setItem('token', data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error: any) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLoginWindow());
        try {
            dispatch(onChecking());
            const { data } = await adminApi.get('/user/renew/token');
            console.log(data);
            localStorage.clear();
            localStorage.setItem('token', data.access_token);
            dispatch(onLogin({ name: data.user.name, id: data.user.id }));
            console.log("Vine a renovar el token");

        } catch (error: any) {
            localStorage.clear();
            dispatch(onLogout());
            console.log("Error al renovar el token");
        }
    }

    const startLogout = () => {
        dispatch(onChecking());
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}