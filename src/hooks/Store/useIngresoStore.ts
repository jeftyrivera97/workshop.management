import { useAppDispatch, useAppSelector } from '../Redux/redux';
import adminApi from "../../api/adminApi";
import { onIngresoError, onIngresoFill, onIngresoLoading } from "../../store/Ingreso/ingresoSlice";
import { ApiError } from "../../interfaces";
import { IngresoData } from "../../interfaces/Ingreso";

export const useIngresoStore = () => {
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
  } = useAppSelector((state) => state.ingreso);

  const dispatch = useAppDispatch();

  // Carga inicial completa (dashboard + tabla)
  const startLoading = async (
    page: number = 1,
    module: string = ""
  ): Promise<void> => {
    dispatch(onIngresoLoading());
    try {
      const token = localStorage.getItem("token");
      const resp = await adminApi.get(`/${module}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("🔍 API Response:", resp.data);
      
      // ✅ El payload ya está tipado como IngresoData
      dispatch(onIngresoFill(resp.data as IngresoData));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error desconocido al cargar los datos";
      
      console.error("❌ Error en startLoading:", errorMessage);
      dispatch(onIngresoError(errorMessage));
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
      
      console.log("🔍 nextPageLoading response:", resp.data);
      dispatch(onIngresoFill(resp.data as IngresoData));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error al cambiar página";

      console.error("❌ Error en nextPageLoading:", errorMessage);
      dispatch(onIngresoError(errorMessage));
    }
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    tableData: tableData || [],
    loading,
    pagination, // ✅ Ahora tipado correctamente
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
