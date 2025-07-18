import { useIngresoStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { InfoInput } from "../../layouts";
import LineChartComponent from "../../layouts/shared/LineChartComponent";
import { DataTable } from "../../layouts";
import { getDateData } from "../../../helpers";


export const IngresoIndex = () => {
  const {
    counter,
    moduleTitle,
    totalMes,
    totalAnual,
    dataGraficaMes,
    totalMesAnterior,
    categoriasMes,
    tiposMes
  } = useIngresoStore();

  const { currentMonth, currentYear, previousMonth } = getDateData();


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
