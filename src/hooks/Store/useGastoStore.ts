import { useAppDispatch, useAppSelector } from "../redux/redux";
import adminApi from "../../api/adminApi";
import {
  onGastoError,
  onGastoFill,
  onGastoLoading,
} from "../../store/Gasto/gastoSlice";
import { ApiError } from "../../interfaces";
import { GastoData } from "../../interfaces/Gasto";

export const useGastoStore = () => {
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
    totalMesYearAnterior,
    tiposMes,
    categoriasMes,
    analisisMensual,
  } = useAppSelector((state) => state.gasto);

  const dispatch = useAppDispatch();

  // Carga inicial completa (dashboard + tabla)
  const startLoading = async (
    page: number = 1,
    module: string = "",
    dateParam?: string
  ): Promise<void> => {
    dispatch(onGastoLoading());
    try {
      const token = localStorage.getItem("token");
      let url = `/${module}?page=${page}`;
      if (
        dateParam !== undefined &&
        dateParam !== null &&
        dateParam !== ""
      ) {
        url += `&dateParam=${dateParam}`;
      }
      const resp = await adminApi.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", resp.data);

      // payload ya está tipado como GastoData
      dispatch(onGastoFill(resp.data as GastoData));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error desconocido al cargar los datos";

      console.error("❌ Error en startLoading:", errorMessage);
      dispatch(onGastoError(errorMessage));
    }
  };

  //Solo paginación de tabla (sin recargar dashboard)
  const nextPageLoading = async (
    page: number = 1,
    module: string = "",
    dateParam?: string
  ): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      //  Construir URL con filtro
      let url = `/${module}?page=${page}`;
      if (
        dateParam !== undefined &&
        dateParam !== null &&
        dateParam !== ""
      ) {
        url += `&dateParam=${dateParam}`;
      }
      const resp = await adminApi.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log("🔍 nextPageLoading response:", resp.data);
      dispatch(onGastoFill(resp.data as GastoData));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error al cambiar página";

      console.error("❌ Error en nextPageLoading:", errorMessage);
      dispatch(onGastoError(errorMessage));
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
    totalMesYearAnterior,
    tiposMes: tiposMes || [],
    categoriasMes: categoriasMes || [],
    analisisMensual: analisisMensual || [],

    //* Métodos
    startLoading,
    nextPageLoading,
  };
};
