/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../api/adminApi";
import { onCompraError, onCompraFill, onCompraLoading } from "../store";
import { ApiError } from "../interfaces";

export const useCompraStore = () => {
  const {
    status,
    loading,
    data,
    errorMessage,
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
  } = useSelector((state: any) => state.compra);
  const dispatch = useDispatch();

  const startLoading = async (page = 1, module = "") => {
    dispatch(onCompraLoading());
    try {
      const token = localStorage.getItem("token");
      const resp = await adminApi.get(`/${module}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp);
      dispatch(onCompraFill(resp.data));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error desconocido al cargar los datos";

      dispatch(onCompraError(`Error al cargar los datos: ${errorMessage}`));
      throw new Error(`Error al cargar los datos: ${errorMessage}`);
    }
  };

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
  };
};
