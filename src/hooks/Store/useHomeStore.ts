import { useAppDispatch, useAppSelector } from "../redux/redux";
import adminApi from "../../api/adminApi";
import {
  onHomeError,
  onHomeFill,
  onHomeLoading,
} from "../../store/Home/homeSlice";
import { ApiError } from "../../interfaces";
import { HomeData } from "../../interfaces/Home";

export const useHomeStore = () => {
  const {
    status,
    loading,
    errorMessage,
    totales,
    balances,
    porcentajes,
    variaciones,
    eficiencia,
    rentabilidad,
    dataGraficaIngresos,
    dataGraficaEgresos,
    categoriasIngresosAnual,
    categoriasComprasAnual,
    categoriasGastosAnual,
    moduleTitle,
  } = useAppSelector((state) => state.home);

  const dispatch = useAppDispatch();

  // Carga inicial completa (dashboard + tabla)
  const startLoading = async (
    module: string = "",
  ): Promise<void> => {
    dispatch(onHomeLoading());
    try {
      const token = localStorage.getItem("token");
      const url = `/${module}`;
      const resp = await adminApi.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", resp.data);

      // ✅ El payload ya está tipado como HomeData
      dispatch(onHomeFill(resp.data as HomeData));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error desconocido al cargar los datos";

      console.error("❌ Error en startLoading:", errorMessage);
      dispatch(onHomeError(errorMessage));
    }
  };

  return {
    //* Propiedades
    loading,
    errorMessage,
    status,
    totales,
    balances,
    porcentajes,
    variaciones,
    eficiencia,
    rentabilidad,
    dataGraficaIngresos,
    dataGraficaEgresos,
    categoriasIngresosAnual,
    categoriasComprasAnual,
    categoriasGastosAnual,
    moduleTitle,

    //* Métodos
    startLoading,
  };
};
