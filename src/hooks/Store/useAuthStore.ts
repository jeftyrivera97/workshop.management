import {
  onChecking,
  onErrorLogin,
  onLogin,
  onLoginWindow,
  onLogout,
} from "../../store/Auth/authSlice";
import adminApi from "../../api/adminApi";
import { ApiError } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/redux";

const RENEW_MARGIN_SECONDS = 60;

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
      console.log("data", data);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("expires", data.expires_at);
      dispatch(
        onLogin({
          name: data.user.name,
          id: data.user.id,
          email: data.user.email,
        })
      );
      console.log("Iniciado sesion correctamente");
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      dispatch(onErrorLogin((error as ApiError).message));
      localStorage.removeItem("token");
    }
  };

  const startLogout = () => {
    dispatch(onChecking());
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    localStorage.removeItem("lastVisitedPath");
    dispatch(onLogout());
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    const expires_at = localStorage.getItem("expires");
    if (!token) {
      dispatch(onLoginWindow());
      return;
    }
    try {
      dispatch(onChecking());

      if (expires_at) {
        const expiresDate = new Date(expires_at);
        const now = new Date();
        const secondsToExpire = (expiresDate.getTime() - now.getTime()) / 1000;

        console.log("Fecha de expiración PHP:", expires_at);
         console.log("Fecha de expiración de JS:", expiresDate);
        console.log("Fecha actual:", now);
        console.log("Segundos para expirar:", secondsToExpire);
     
        if (secondsToExpire <= 0) {
          // Ya expiró
          localStorage.removeItem("token");
          localStorage.removeItem("expires");
          dispatch(onLogout());
          return;
        }

        if (secondsToExpire <= RENEW_MARGIN_SECONDS) {
          // Renovar token aquí
          try {
            const { data } = await adminApi.post("/user/renew/token");
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("expires", data.expires_at);
            console.log("Token renovado automáticamente");
          } catch (error) {
            const apiError = error as ApiError;
            console.error(
              "Error al renovar el token:",
              apiError.message || apiError
            );
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
            dispatch(onLogout());
            return;
          }
        }
      }

      // Token válido, obtenemos el usuario
      const { data } = await adminApi.get("/user");
      dispatch(
        onLogin({
          name: data.user.name,
          id: data.user.id,
          email: data.user.email,
        })
      );
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error al obtener el usuario:", apiError.message || apiError);
      dispatch(onLogout());
      localStorage.clear();
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
