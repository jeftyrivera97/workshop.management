import { useIngresoStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { InfoInput } from "../../layouts";
import LineChartComponent from "../shared/LineChartComponent";
import { DataTable } from "../../layouts";
import { useEffect, useRef, useState } from "react";
import { MonthDateInput } from "./../shared/MonthDateInput";

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

  // ✅ Estado centralizado en el padre
  const getCurrentYearMonth = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const [currentSelectedMonth, setCurrentSelectedMonth] = useState<string>(
    getCurrentYearMonth()
  );

  const hasLoadedRef = useRef(false);

  // ✅ Función para obtener nombre del mes
  const getMonthName = (yearMonth: string): string => {
    if (!yearMonth) return "";

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const [year, month] = yearMonth.split("-");
    const monthIndex = parseInt(month) - 1;

    return `${monthNames[monthIndex]} ${year}`;
  };

  // ✅ Función más simple que retorna toda la información
  const getMonthInfo = (yearMonth: string) => {
    if (!yearMonth) {
      const now = new Date();
      const currentYM = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}`;
      return {
        currentName: getMonthName(currentYM),
        previousName: "",
        year: now.getFullYear(),
      };
    }

    const [year, month] = yearMonth.split("-");
    const currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const previousDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    const previousYM = `${previousDate.getFullYear()}-${String(
      previousDate.getMonth() + 1
    ).padStart(2, "0")}`;

    return {
      currentName: getMonthName(yearMonth),
      previousName: getMonthName(previousYM),
      year: parseInt(year),
    };
  };

  const monthInfo = getMonthInfo(currentSelectedMonth);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      startLoading(1, "ingreso", currentSelectedMonth);
      hasLoadedRef.current = true;
    }
  }, []);

  // ✅ Manejar cambios desde el componente hijo
  const handleMonthSelection = (selectedMonth: string) => {
    console.log("📅 Mes recibido en IngresoIndex:", selectedMonth);
    setCurrentSelectedMonth(selectedMonth); // ✅ Actualizar estado local
    startLoading(1, "ingreso", selectedMonth); // ✅ Cargar datos
  };

  const selectedMonthName = getMonthName(currentSelectedMonth);

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
