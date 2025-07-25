import { useCompraStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { AnalisisFinanciero } from "./../shared/analisis/AnalisisFinanciero";
import { InfoInput } from "../../layouts";
import LineChartComponent from "../shared/graphs/LineChartComponent";
import { DataTable } from "../../layouts";
import { useEffect, useRef, useState } from "react";
import { MonthDateInput } from "./../shared/MonthDateInput";
import { getDateData } from "../../../helpers/getDateData";

export const CompraIndex = () => {
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
  } = useCompraStore();

  const { getCurrentYearMonth, getMonthName, getMonthInfo } = getDateData();
  const [currentSelectedMonth, setCurrentSelectedMonth] = useState<string>(
    getCurrentYearMonth()
  );

  const hasLoadedRef = useRef(false);
  const monthInfo = getMonthInfo(currentSelectedMonth);
  const selectedMonthName = getMonthName(currentSelectedMonth);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      startLoading(1, "compra", currentSelectedMonth);
      hasLoadedRef.current = true;
    }
  }, []);

  const handleMonthSelection = (selectedMonth: string) => {
    setCurrentSelectedMonth(selectedMonth);
    startLoading(1, "compra", selectedMonth);
  };

  return (
    <div className="space-y-6 mt-2" >
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
        descripcion="Compras"
      />
      {/* Gráfico de líneas */}
      <LineChartComponent data={dataGraficaMes} />
      {/* Tablas de datos */}
      <div className="space-y-6">
        {" "}
        {/* ✅ Agrupar tablas */}
        <DataTable
          data={tiposMes}
          titulo={`Compras por Tipo - ${selectedMonthName}`}
        />
        <DataTable
          data={categoriasMes}
          titulo={`Compras por Categoría - ${selectedMonthName}`}
        />
        <IndexTable selectedMonth={currentSelectedMonth} />
      </div>
    </div>
  );
};
