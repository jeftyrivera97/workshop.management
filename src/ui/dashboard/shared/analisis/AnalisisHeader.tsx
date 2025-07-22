import { AnalisisMensual } from "../../../../interfaces";

interface AnalisisFinancieroProps {
  analisisMensual: AnalisisMensual[];
  selectedMonthName: string;
  descripcion: string;
}

export const AnalisisHeader = ({
  analisisMensual,
  selectedMonthName,
  descripcion,
}: AnalisisFinancieroProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        📊 Análisis de {descripcion}
      </h2>
      <p className="text-sm opacity-70 mb-2">{selectedMonthName}</p>

      {/* Contadores por tipo - RESPONSIVE */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs">
        <span className="badge badge-success gap-1 text-xs">
          ✅{" "}
          {analisisMensual.filter((item) => item.tipo === "success").length}
          <span className="hidden sm:inline ml-1">Óptimos</span>
        </span>
        <span className="badge badge-warning gap-1 text-xs">
          ⚠️{" "}
          {analisisMensual.filter((item) => item.tipo === "warning").length}
          <span className="hidden sm:inline ml-1">Advertencias</span>
        </span>
        <span className="badge badge-error gap-1 text-xs">
          🚨{" "}
          {analisisMensual.filter((item) => item.tipo === "danger").length}
          <span className="hidden sm:inline ml-1">Críticos</span>
        </span>
        <span className="badge badge-info gap-1 text-xs">
          ℹ️{" "}
          {analisisMensual.filter((item) => item.tipo === "info").length}
          <span className="hidden sm:inline ml-1">Información</span>
        </span>
      </div>
    </div>
  );
};
