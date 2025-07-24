import { useAppDispatch, useAppSelector } from "../redux/redux";
import adminApi from "../../api/adminApi";
import {
  onPlanillaError,
  onPlanillaFill,
  onPlanillaLoading,
} from "../../store/Planilla/planillaSlice";
import { ApiError } from "../../interfaces";
import { PlanillaData } from "../../interfaces/Planilla";

export const usePlanillaStore = () => {
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
     empleadosMes,
      puestosMes,
      areasMes,
  } = useAppSelector((state) => state.planilla);

  const dispatch = useAppDispatch();

  // Carga inicial completa (dashboard + tabla)
  const startLoading = async (
    page: number = 1,
    module: string = "",
    dateParam?: string
  ): Promise<void> => {
    dispatch(onPlanillaLoading());
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

      // payload ya está tipado como PlanillaData
      dispatch(onPlanillaFill(resp.data as PlanillaData));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error desconocido al cargar los datos";

      console.error("❌ Error en startLoading:", errorMessage);
      dispatch(onPlanillaError(errorMessage));
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
      dispatch(onPlanillaFill(resp.data as PlanillaData));
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Error al cambiar página";

      console.error("❌ Error en nextPageLoading:", errorMessage);
      dispatch(onPlanillaError(errorMessage));
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
    empleadosMes: empleadosMes || [],
    puestosMes: puestosMes || [],
    areasMes: areasMes || [],

    //* Métodos
    startLoading,
    nextPageLoading,
  };
};
