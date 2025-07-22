import { FaPercentage, FaBalanceScale, FaChartPie } from "react-icons/fa";

interface MargenCardProps {
  margen_ganancia_actual: number;
  margen_ganancia_anterior: number;
  porcentaje_egresos_actual: number;
  porcentaje_egresos_anterior: number;
  porcentaje_compras: number;
  porcentaje_gastos: number;
}

export const MargenCard = ({
  margen_ganancia_actual,
  margen_ganancia_anterior,
  porcentaje_egresos_actual,
  porcentaje_egresos_anterior,
  porcentaje_compras,
  porcentaje_gastos,
}: MargenCardProps) => {
  return (
    <div className="w-full bg-base-200/80 border border-base-300 rounded-xl shadow p-4 flex flex-col gap-2 backdrop-blur-sm">
      <div className="text-xs text-base-content/60 mb-2 text-center font-semibold">
        Márgenes y distribución de egresos
      </div>
      <div className="flex items-center gap-2">
        <FaBalanceScale className="text-blue-500" />
        <span className="font-bold text-xs text-base-content/70 w-32">Margen actual</span>
        <span className={`font-semibold ${margen_ganancia_actual >= 0 ? "text-green-600" : "text-red-600"}`}>
          {margen_ganancia_actual.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaBalanceScale className="text-gray-400" />
        <span className="font-bold text-xs text-base-content/70 w-32">Margen anterior</span>
        <span className={`font-semibold ${margen_ganancia_anterior >= 0 ? "text-green-600" : "text-red-600"}`}>
          {margen_ganancia_anterior.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaPercentage className="text-yellow-500" />
        <span className="font-bold text-xs text-base-content/70 w-32">Egresos actual</span>
        <span className="font-semibold text-base-content">
          {porcentaje_egresos_actual.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaPercentage className="text-gray-400" />
        <span className="font-bold text-xs text-base-content/70 w-32">Egresos anterior</span>
        <span className="font-semibold text-base-content">
          {porcentaje_egresos_anterior.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaChartPie className="text-blue-400" />
        <span className="font-bold text-xs text-base-content/70 w-32">% Compras</span>
        <span className="font-semibold text-base-content">
          {porcentaje_compras.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaChartPie className="text-yellow-600" />
        <span className="font-bold text-xs text-base-content/70 w-32">% Gastos</span>
        <span className="font-semibold text-base-content">
          {porcentaje_gastos.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
      </div>
    </div>
  );
};