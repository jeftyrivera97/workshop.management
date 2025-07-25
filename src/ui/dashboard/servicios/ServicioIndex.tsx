import { useServicioStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { InfoInput } from "../../layouts";
import { DataTable } from "../../layouts";
import { useEffect, useRef, useState } from "react";
import { MonthDateInput } from "../shared/MonthDateInput";
import { getDateData } from "../../../helpers/getDateData";
import { DataUnidadTable } from "../shared/DataUnidadTable";
import LineChartUComponent from "../shared/graphs/LineChartUComponent";

export const ServicioIndex = () => {
  const {
    startLoading,
    counter,
    moduleTitle,
    totalMes,
    totalAnual,
    dataGraficaMes,
    totalMesYearAnterior,
    categoriasMes,
    tiposMes,
  } = useServicioStore();

  const { getCurrentYearMonth, getMonthName, getMonthInfo } = getDateData();
  const [currentSelectedMonth, setCurrentSelectedMonth] = useState<string>(
    getCurrentYearMonth()
  );

  const hasLoadedRef = useRef(false);
  const monthInfo = getMonthInfo(currentSelectedMonth);
  const selectedMonthName = getMonthName(currentSelectedMonth);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      startLoading(1, "servicio", currentSelectedMonth);
      hasLoadedRef.current = true;
    }
  }, []);

  const handleMonthSelection = (selectedMonth: string) => {
    setCurrentSelectedMonth(selectedMonth);
    startLoading(1, "servicio", selectedMonth);
  };

  return (
    <div className="space-y-6 mt-2">
      {" "}
      {/* ✅ Usar space-y para consistencia */}
      {/* Header del módulo */}
      <ModuleTab moduleName={moduleTitle} />
      {/* Selector de mes */}
      <MonthDateInput
        selectedMonth={currentSelectedMonth}
        onMonthChange={handleMonthSelection}
      />
      {/* Indicador de período */}
      <div className="ml-2">
        <p className="text-sm text-base-content/60 flex items-center gap-2">
          <span className="text-primary">📅</span>
          Período:{" "}
          <span className="font-medium text-base-content">
            {selectedMonthName}
          </span>
        </p>
      </div>
      {/* KPIs - Grid de 4 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-2">
        <InfoInput
          valor={counter}
          descripcion={`Registros de ${selectedMonthName}`}
        />
        <InfoInput
          valor={totalMes}
          descripcion={`Total de ${monthInfo.currentName}`}
        />
        <InfoInput
          valor={totalMesYearAnterior}
          descripcion={`Total de ${monthInfo.previousYearName}`}
        />
        <InfoInput
          valor={totalAnual}
          descripcion={`Total del Año ${monthInfo.year}`}
        />
      </div>
      {/* Gráfico de líneas */}
      <LineChartUComponent data={dataGraficaMes} />
      {/* Tablas de datos */}
      <div className="space-y-6">
        {" "}
        <DataUnidadTable
          data={tiposMes}
          titulo={`Servicios por Marcas y Modelos de Autos - ${selectedMonthName}`}
        />
        <DataTable
          data={categoriasMes}
          titulo={`Servicios por Categoría - ${selectedMonthName}`}
        />
        <IndexTable selectedMonth={currentSelectedMonth} />
      </div>
    </div>
  );
};
