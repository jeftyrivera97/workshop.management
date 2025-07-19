
import { useAppDispatch, useAppSelector } from "./redux";
import adminApi from "../api/adminApi";
import { onCompraError, onCompraFill, onCompraLoading } from "../store";
import { ApiError } from "../interfaces";

export const useCompraStore = () => {
  const {
    status,
    loading,
    tableData,
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
  } = useAppSelector((state) => state.compra);
  const dispatch = useAppDispatch();

  // Carga inicial completa (dashboard + tabla)
  const startLoading = async (
    page: number = 1,
    module: string = ""
  ): Promise<void> => {
    dispatch(onCompraLoading());
    try {
      const token = localStorage.getItem("token");
      const resp = await adminApi.get(`/${module}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("startLoading response:", resp);
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

  //Solo paginación de tabla (sin recargar dashboard)
  const nextPageLoading = async (
    page: number = 1,
    module: string = ""
  ): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const resp = await adminApi.get(`/${module}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Solo actualizar datos de tabla sin resetear el dashboard
      dispatch(
        onCompraFill({
          ...resp.data,
          // Mantener datos del dashboard existentes
          totalMes,
          totalAnual,
          dataGraficaMes,
          totalMesAnterior,
          tiposMes,
          categoriasMes,
          counter,
          moduleName,
          moduleTitle,
        })
      );
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
    tableData: tableData || [],
    loading,
    pagination,
    tableHeaders,
    counter,
    moduleName,
    moduleTitle,
    totalMes,
    totalAnual,
    dataGraficaMes: dataGraficaMes || [],
    totalMesAnterior,
    tiposMes: tiposMes || [],
    categoriasMes: categoriasMes || [],

    //* Métodos
    startLoading,
    nextPageLoading,
  };
};
