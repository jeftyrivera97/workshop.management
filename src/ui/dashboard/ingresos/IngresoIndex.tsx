import { useIngresoStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { InfoInput } from "../../layouts";
import LineChartComponent from "../shared/LineChartComponent";
import { DataTable } from "../../layouts";
import { useEffect, useRef, useState } from "react";
import { MonthDateInput } from "./../shared/MonthDateInput";

import { getDateData } from "../../../helpers/getDateData";

export const IngresoIndex = () => {
  const {
    startLoading,
    counter,
    moduleTitle,
    totalMes,
    totalAnual,
    dataGraficaMes,
    totalMesAnterior,
    categoriasMes,
    tiposMes,
  } = useIngresoStore();


  const { getCurrentYearMonth, getMonthName, getMonthInfo } = getDateData();
  const [currentSelectedMonth, setCurrentSelectedMonth] = useState<string>(
    getCurrentYearMonth()
  );

  const hasLoadedRef = useRef(false);
  const monthInfo = getMonthInfo(currentSelectedMonth);
  const selectedMonthName = getMonthName(currentSelectedMonth);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      startLoading(1, "ingreso", currentSelectedMonth);
      hasLoadedRef.current = true;
    }
  }, []);

 
  const handleMonthSelection = (selectedMonth: string) => {
    console.log("📅 Mes recibido en IngresoIndex:", selectedMonth);
    setCurrentSelectedMonth(selectedMonth); // ✅ Actualizar estado local
    startLoading(1, "ingreso", selectedMonth); // ✅ Cargar datos
  };

  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-4 ">
        <ModuleTab moduleName={moduleTitle} />
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-4 ">
        {/* ✅ Pasar estado y callback al hijo */}
        <MonthDateInput
          selectedMonth={currentSelectedMonth}
          onMonthChange={handleMonthSelection}
        />
      </div>

      {/* ✅ Mostrar información del mes seleccionado */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-4 ">
        <div className="mb-4 ml-2">
          <p className="text-sm text-base-content/60 flex items-center gap-2">
            <span className="text-primary">📅</span>
            Período:{" "}
            <span className="font-medium text-base-content">
              {selectedMonthName}
            </span>
          </p>
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-4 ml-2">
        <div>
          <InfoInput
            valor={counter}
            descripcion={`Registros de ${selectedMonthName}`}
          />
        </div>
        <div>
          <InfoInput
            valor={totalMes}
            descripcion={`Total de ${monthInfo.currentName}`}
          />
        </div>
        <div>
          <InfoInput
            valor={totalMesAnterior}
            descripcion={`Total ${monthInfo.previousName}`}
          />
        </div>
        <div>
          <InfoInput
            valor={totalAnual}
            descripcion={`Total del Año ${monthInfo.year}`}
          />
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-2">
        <div>
          <LineChartComponent data={dataGraficaMes} />
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-2">
        <div>
          <DataTable
            data={tiposMes}
            titulo={`Ingresos por Tipo - ${selectedMonthName}`}
          />
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-2">
        <div>
          <DataTable
            data={categoriasMes}
            titulo={`Ingresos por Categoría - ${selectedMonthName}`}
          />
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-2">
        <div>
          {/* ✅ Pasar el mes seleccionado a IndexTable */}
          <IndexTable selectedMonth={currentSelectedMonth} />
        </div>
      </div>
    </div>
  );
};
