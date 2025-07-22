import { ModuleTab } from "../../layouts/components/ModuleTab";
import { InfoInput } from "../../layouts";
import BarGraphComparisonComponent from "../shared/graphs/BarGraphComparisonComponent";
import { DataTable } from "../../layouts";
import { useEffect, useRef } from "react";
import { useHomeStore } from "../../../hooks/store/useHomeStore";
import { HomeDataGrafica } from "../../../interfaces/Home";
import { RentabilidadCard } from "./components/RentabilidadCard";
import { EficienciaCard } from "./components/EficienciaCard";
import { TrendCard } from "./components/TrendCard";
import { MargenCard } from "./components/MargenCard";
import { InfoBalance } from "./components/InfoBalance";

export const HomeIndex = () => {
  const {
    startLoading,
    totales,
    balances,
    porcentajes,
    variaciones,
    eficiencia,
    rentabilidad,
    dataGraficaIngresos,
    dataGraficaEgresos,
    categoriasIngresosAnual,
    categoriasComprasAnual,
    categoriasGastosAnual,
    moduleTitle,
    tiposIngresosAnual,
  } = useHomeStore();

  const currentYear = new Date().getFullYear();

  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      startLoading("home");
      hasLoadedRef.current = true;
    }
  }, []);

  const chartData = dataGraficaIngresos.map(
    (data: HomeDataGrafica, index: number) => ({
      descripcion: data.descripcion,
      data1: data.total,
      data2: dataGraficaEgresos[index]?.total ?? 0,
    })
  );

  return (
    <div className="space-y-6 mt-2">
      <ModuleTab moduleName={moduleTitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-2">
        <InfoInput
          valor={`L. ${totales.ingresosAnualActual.toLocaleString("es-HN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          descripcion={`Total Ingreso del Año ${currentYear}`}
        />
        <InfoInput
          valor={`L. ${totales.comprasAnualActual.toLocaleString("es-HN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          descripcion={`Total Compras del Año ${currentYear}`}
        />
        <InfoInput
          valor={`L. ${totales.gastosAnualActual.toLocaleString("es-HN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          descripcion={`Total Gastos del Año ${currentYear}`}
        />
        <InfoBalance
          valor={balances.balance_anual}
          descripcion={`Balance del Año ${currentYear}`}
        />
      </div>

      <div
        className="grid gap-4 ml-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <RentabilidadCard
          clasificacion={rentabilidad.clasificacion_rentabilidad}
          mensaje={rentabilidad.mensaje_rentabilidad}
          recomendacion={rentabilidad.recomendacion_rentabilidad}
        />

        <EficienciaCard
          eficiencia_compras={eficiencia.eficiencia_compras}
          recomendacion={eficiencia.recomendacion}
        />
      </div>

      <div
        className="grid gap-4 ml-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <TrendCard
          variacion_ingresos={variaciones.variacion_ingresos}
          variacion_egresos={variaciones.variacion_egresos}
          variacion_balance={variaciones.variacion_balance}
          variacion_margen={variaciones.variacion_margen}
          tendencia_ingresos={variaciones.tendencia_ingresos}
          tendencia_egresos={variaciones.tendencia_egresos}
          tendencia_balance={variaciones.tendencia_balance}
          tendencia_margen={variaciones.tendencia_margen}
        />

        <MargenCard
          margen_ganancia_actual={porcentajes.margen_ganancia_actual}
          margen_ganancia_anterior={porcentajes.margen_ganancia_anterior}
          porcentaje_egresos_actual={porcentajes.porcentaje_egresos_actual}
          porcentaje_egresos_anterior={porcentajes.porcentaje_egresos_anterior}
          porcentaje_compras={porcentajes.porcentaje_compras}
          porcentaje_gastos={porcentajes.porcentaje_gastos}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 ml-2">
        <BarGraphComparisonComponent data={chartData} />

        <DataTable
          data={tiposIngresosAnual}
          titulo={`Tipos de Ingresos - ${currentYear}`}
        />
        <DataTable
          data={categoriasIngresosAnual}
          titulo={`Categorías de Ingresos - ${currentYear}`}
        />

        <DataTable
          data={categoriasComprasAnual}
          titulo={`Categorías de Compras - ${currentYear}`}
        />
        <DataTable
          data={categoriasGastosAnual}
          titulo={`Categorías de Gastos - ${currentYear}`}
        />
      </div>
    </div>
  );
};
