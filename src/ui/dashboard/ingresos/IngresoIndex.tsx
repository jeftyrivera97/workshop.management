import { useIngresoStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { InfoInput } from "../../layouts";
import LineChartComponent from "../../layouts/components/LineChartComponent";
import { DataTable } from "../../layouts";

export const IngresoIndex = () => {
  const {
    counter,
    moduleTitle,
    totalMes,
    totalAnual,
    dataGraficaMes,
    totalMesAnterior,
    categoriasMes,
    tiposMes,
  } = useIngresoStore();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleDateString("es-ES", {
    month: "long",
  });
  // Calcular el mes anterior
  const previousMonthDate = new Date();
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  const previousMonth = previousMonthDate.toLocaleDateString("es-ES", {
    month: "long",
  });

  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-4 ">
        <ModuleTab moduleName={moduleTitle} />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4 ml-2">
        <div>
          <InfoInput
            valor={counter}
            descripcion={`Registros de ${currentMonth} ${currentYear}`}
          />
        </div>
        <div>
          <InfoInput
            valor={totalMes}
            descripcion={`Total del Mes ${currentMonth} ${currentYear}`}
          />
        </div>

        <div>
          <InfoInput
            valor={totalMesAnterior}
            descripcion={`Total Mes Anterior ${previousMonth} ${currentYear}`}
          />
        </div>
        <div>
          <InfoInput
            valor={totalAnual}
            descripcion={`Total del Año ${currentYear}`}
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
          <DataTable data={tiposMes} titulo="Ingresos por Tipo" />
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-2">
        <div>
          <DataTable data={categoriasMes} titulo="Ingresos por Categoría" />
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-2">
        <div>
          <IndexTable />
        </div>
      </div>
    </div>
  );
};
