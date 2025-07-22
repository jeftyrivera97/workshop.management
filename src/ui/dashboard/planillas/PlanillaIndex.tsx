import { usePlanillaStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { AnalisisFinanciero } from "../shared/analisis/AnalisisFinanciero"; 
import { InfoInput } from "../../layouts";
import LineChartComponent from "../shared/LineChartComponent";
import { DataTable } from "../../layouts";
import { useEffect, useRef, useState } from "react";
import { MonthDateInput } from "../shared/MonthDateInput";
import { getDateData } from "../../../helpers/getDateData";

export const PlanillaIndex = () => {
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
    analisisMensual,
    empleadosMes,
    puestosMes,
    areasMes,
  } = usePlanillaStore();

  const { getCurrentYearMonth, getMonthName, getMonthInfo } = getDateData();
  const [currentSelectedMonth, setCurrentSelectedMonth] = useState<string>(
    getCurrentYearMonth()
  );

  const hasLoadedRef = useRef(false);
  const monthInfo = getMonthInfo(currentSelectedMonth);
  const selectedMonthName = getMonthName(currentSelectedMonth);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      startLoading(1, "planilla", currentSelectedMonth);
      hasLoadedRef.current = true;
    }
  }, []);

  const handleMonthSelection = (selectedMonth: string) => {
    setCurrentSelectedMonth(selectedMonth);
    startLoading(1, "planilla", selectedMonth);
  };

  return (
    <div className="space-y-6">
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
      {/* Análisis financiero */}
      <AnalisisFinanciero
        analisisMensual={analisisMensual}
        selectedMonthName={selectedMonthName}
        descripcion="Planillas"
      />
      {/* Gráfico de líneas */}
      <LineChartComponent data={dataGraficaMes} />
      {/* Tablas de datos */}
      <div className="space-y-6">
        {" "}
        {/* ✅ Agrupar tablas */}
        <DataTable
          data={tiposMes}
          titulo={`Planillas por Tipo - ${selectedMonthName}`}
        />
        <DataTable
          data={categoriasMes}
          titulo={`Planillas por Categoría - ${selectedMonthName}`}
        />
         <DataTable
          data={empleadosMes}
          titulo={`Planillas por Empleado - ${selectedMonthName}`}
        />
         <DataTable
          data={puestosMes}
          titulo={`Planillas por Puestos - ${selectedMonthName}`}
        />
         <DataTable
          data={areasMes}
          titulo={`Planillas por Area - ${selectedMonthName}`}
        />
        <IndexTable selectedMonth={currentSelectedMonth} />
      </div>
    </div>
  );
};
