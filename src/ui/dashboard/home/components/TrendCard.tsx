import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa";

interface TrendCardProps {
  variacion_ingresos: number;
  variacion_egresos: number;
  variacion_balance: number;
  variacion_margen: number;
  tendencia_ingresos: string;
  tendencia_egresos: string;
  tendencia_balance: string;
  tendencia_margen: string;
}

const trendConfig = {
  crecimiento:   { icon: <FaArrowUp className="text-green-500" />, color: "text-green-600", label: "Crecimiento" },
  decrecimiento: { icon: <FaArrowDown className="text-red-500" />, color: "text-red-600", label: "Decrecimiento" },
  igual:         { icon: <FaArrowRight className="text-gray-400" />, color: "text-gray-500", label: "Sin cambio" },
  aumento:       { icon: <FaArrowUp className="text-yellow-500" />, color: "text-yellow-700", label: "Aumento" },
  reduccion:     { icon: <FaArrowDown className="text-blue-500" />, color: "text-blue-700", label: "Reducción" },
  mejora:        { icon: <FaArrowUp className="text-blue-500" />, color: "text-blue-700", label: "Mejora" },
  deterioro:     { icon: <FaArrowDown className="text-red-500" />, color: "text-red-700", label: "Deterioro" },
};

function getTrend(tendencia: string) {
  return trendConfig[tendencia as keyof typeof trendConfig] || { icon: <FaArrowRight />, color: "text-gray-600", label: tendencia };
}

export const TrendCard = ({
  variacion_ingresos,
  variacion_egresos,
  variacion_balance,
  variacion_margen,
  tendencia_ingresos,
  tendencia_egresos,
  tendencia_balance,
  tendencia_margen,
}: TrendCardProps) => {
  return (
    <div className="w-full bg-base-200/80 border border-base-300 rounded-xl shadow p-4 flex flex-col gap-3 backdrop-blur-sm">
      <div className="text-xs text-base-content/60 mb-2 text-center">
        Variación porcentual respecto al año anterior
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-xs text-base-content/70 w-24">Ingresos</span>
        <span className={`font-semibold flex items-center gap-1 ${getTrend(tendencia_ingresos).color}`}>
          {getTrend(tendencia_ingresos).icon}
          {variacion_ingresos.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
        <span className="text-xs text-base-content/60 capitalize ml-2">{getTrend(tendencia_ingresos).label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-xs text-base-content/70 w-24">Egresos</span>
        <span className={`font-semibold flex items-center gap-1 ${getTrend(tendencia_egresos).color}`}>
          {getTrend(tendencia_egresos).icon}
          {variacion_egresos.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
        <span className="text-xs text-base-content/60 capitalize ml-2">{getTrend(tendencia_egresos).label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-xs text-base-content/70 w-24">Balance</span>
        <span className={`font-semibold flex items-center gap-1 ${getTrend(tendencia_balance).color}`}>
          {getTrend(tendencia_balance).icon}
          {variacion_balance.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
        <span className="text-xs text-base-content/60 capitalize ml-2">{getTrend(tendencia_balance).label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-xs text-base-content/70 w-24">Margen</span>
        <span className={`font-semibold flex items-center gap-1 ${getTrend(tendencia_margen).color}`}>
          {getTrend(tendencia_margen).icon}
          {variacion_margen.toLocaleString("es-HN", { maximumFractionDigits: 2 })}%
        </span>
        <span className="text-xs text-base-content/60 capitalize ml-2">{getTrend(tendencia_margen).label}</span>
      </div>
    </div>
  );
};