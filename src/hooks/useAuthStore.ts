import {
  onChecking,
  onLogin,
  onLoginWindow,
  onLogout,
} from "../store/Auth/authSlice";
import adminApi from "../api/adminApi";
import { ApiError } from "../interfaces";
import { useAppDispatch, useAppSelector } from './redux';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(onChecking());
    try {
      const { data } = await adminApi.post("/login", { email, password });
      localStorage.setItem("token", data.access_token);
      dispatch(onLogin({ name: data.user.name, id: data.user.id, email: data.user.email }));
      console.log("Iniciado sesion correctamente");
    } catch (error) {
        const apiError = error as ApiError;
        console.error("Error al renovar el token:", apiError.message || apiError);
        localStorage.clear();
        dispatch(onLogout());
    }
  }; //

  
  const startLogout = () => {
    dispatch(onChecking());
    localStorage.clear();
    dispatch(onLogout());
  };


  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLoginWindow());
    try {
      dispatch(onChecking());
      const { data } = await adminApi.get("/user/renew/token");
      localStorage.clear();
      localStorage.setItem("token", data.access_token);
    dispatch(onLogin({ name: data.user.name, id: data.user.id, email: data.user.email }));
      console.log("Vine a renovar el token");
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error al renovar el token:", apiError.message || apiError);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    startLogin,
    startLogout,
    checkAuthToken,
  };
};





  // const startRegister = async ({
  //   email,
  //   password,
  //   name,
  // }: {
  //   email: string;
  //   password: string;
  //   name: string;
  // }) => {
  //   dispatch(onChecking());
  //   try {
  //     const { data } = await adminApi.post("/auth/new", {
  //       email,
  //       password,
  //       name,
  //     });
  //     localStorage.setItem("token", data.token);
  //     dispatch(onLogin({ name: data.name, user: data.uid }));
  //   } catch (error) {
  //       const apiError = error as ApiError;
  //       console.error("Error al renovar el token:", apiError.message || apiError);
  //       localStorage.clear();
  //       dispatch(onLogout());
  //   }
  // };