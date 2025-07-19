import { useCompraStore } from "../../../hooks";
import { ModuleTab } from "../../layouts/components/ModuleTab";
import { IndexTable } from "./components/IndexTable";
import { InfoInput } from "../../layouts";
import LineChartComponent from "../../layouts/shared/LineChartComponent";
import { DataTable } from "../../layouts";
import { getDateData } from "../../../helpers";
import { useEffect, useRef } from "react";

export const CompraIndex = () => {
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
  } = useCompraStore();

  // Use ref to track if initial load has been done
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      startLoading(1, "compra");
      hasLoadedRef.current = true;
    }
  }, []);

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
          <DataTable data={tiposMes} titulo="Compras por Tipo" />
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-2">
        <div>
          <DataTable data={categoriasMes} titulo="Compras por Categoría" />
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
