import { IngresoAnalisisMensual } from "../../../../interfaces";

interface AnalisisFinancieroMultipleProps {
  analisisMensual: IngresoAnalisisMensual[];
  selectedMonthName: string;
}

export const AnalisisFinanciero = ({
  analisisMensual,
  selectedMonthName,
}: AnalisisFinancieroMultipleProps) => {
  if (
    !analisisMensual ||
    !Array.isArray(analisisMensual) ||
    analisisMensual.length === 0
  ) {
    return null;
  }

  // Función para obtener el emoji según la categoría
  const getCategoryEmoji = (categoria: string) => {
    switch (categoria) {
      case "pasivos":
        return "🏦";
      case "ingresos_operacionales":
        return "🚗";
      case "balance_general":
        return "⚖️";
      default:
        return "📈";
    }
  };

  // Función para obtener el color según el tipo
  const getColorClass = (tipo: string) => {
    switch (tipo) {
      case "danger":
        return "border-error bg-error/5 text-error";
      case "warning":
        return "border-warning bg-warning/5 text-warning";
      case "success":
        return "border-success bg-success/5 text-success";
      default:
        return "border-info bg-info/5 text-info";
    }
  };

  const getBadgeClass = (tipo: string) => {
    switch (tipo) {
      case "danger":
        return "badge-error";
      case "warning":
        return "badge-warning";
      case "success":
        return "badge-success";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header principal */}
      <div className="card bg-gradient-to-r from-base-100 to-base-200 shadow-lg">
        <div className="card-body p-4">
          <h2 className="card-title text-xl font-bold flex items-center gap-2">
            📊 Análisis por Tipos de Ingresos
            <div className="badge badge-primary">{selectedMonthName}</div>
          </h2>
          <p className="text-sm opacity-70">
            Análisis detallado de los ingresos del mes seleccionado. Cada
            tarjeta representa un análisis financiero clave, con recomendaciones
            y estado actual.
          </p>
        </div>
      </div>

      {/* Grid de análisis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {analisisMensual.map((analisis, index) => (
          <div
            key={index}
            className={`card border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${getColorClass(
              analisis.tipo
            )}`}
          >
            <div className="card-body p-4">
              {/* Header del análisis individual */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {getCategoryEmoji(analisis.categoria)}
                  </span>
                  <div>
                    <h3 className="font-bold text-base capitalize">
                      {analisis.categoria?.replace("_", " ") || "Análisis"}
                    </h3>
                    {analisis.porcentaje !== undefined && (
                      <div
                        className={`badge ${getBadgeClass(
                          analisis.tipo
                        )} badge-sm font-bold`}
                      >
                        {analisis.porcentaje}%
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Título del análisis */}
              <h4 className="font-semibold text-sm mb-3">{analisis.titulo}</h4>

              {/* Barra de progreso - SIEMPRE mostrar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Nivel</span>
                  <span className="font-bold">
                    {analisis.limite_maximo
                      ? `Límite: ${analisis.limite_maximo}%`
                      : analisis.rango_recomendado
                      ? `Rango: ${analisis.rango_recomendado}`
                      : ""}
                  </span>
                </div>

                {analisis.porcentaje !== undefined &&
                analisis.porcentaje !== null ? (
                  <div className="relative h-1.5 bg-base-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        analisis.tipo === "danger"
                          ? "bg-error"
                          : analisis.tipo === "warning"
                          ? "bg-warning"
                          : analisis.tipo === "success"
                          ? "bg-success"
                          : "bg-info"
                      }`}
                      style={{ width: `${Math.max(analisis.porcentaje, 1)}%` }}
                    />
                    {analisis.limite_maximo && (
                      <div
                        className="absolute top-0 w-px h-full bg-base-content/40"
                        style={{ left: `${analisis.limite_maximo}%` }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="h-1.5 bg-base-300 rounded-full flex items-center justify-center">
                    <span className="text-xs text-base-content/60">
                      Sin datos
                    </span>
                  </div>
                )}

                {/* Mensaje especial para 0% */}
                {analisis.porcentaje === 0 && (
                  <div className="text-xs text-center mt-1 text-success font-medium">
                    {analisis.tipo === "info"
                      ? "ℹ️ Sin información"
                      : "✅ Estado óptimo"}
                  </div>
                )}
              </div>

              {/* Información específica */}
              {analisis.ratio && (
                <div className="mb-2">
                  <span className="text-xs font-medium">Ratio: </span>
                  <span className="badge badge-outline badge-xs">
                    {analisis.ratio}
                  </span>
                </div>
              )}

              {analisis.cantidad_categorias && (
                <div className="mb-2">
                  <span className="text-xs font-medium">Categorías: </span>
                  <span className="badge badge-outline badge-xs">
                    {analisis.cantidad_categorias}
                  </span>
                </div>
              )}

              {analisis.categoria_principal && (
                <div className="mb-2">
                  <span className="text-xs font-medium">Principal: </span>
                  <span className="badge badge-outline badge-xs">
                    {analisis.categoria_principal}
                  </span>
                </div>
              )}

              {/* Análisis en acordeón compacto */}
              <div className="collapse collapse-arrow bg-base-200/50 rounded-md">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-xs font-medium py-2 px-3 min-h-0">
                  📄 Ver detalles
                </div>
                <div className="collapse-content px-3 pb-3">
                  <div className="space-y-2">
                    <div className="text-xs">
                      <strong className="text-info">🔍 Situación:</strong>
                      <p className="mt-1 leading-relaxed">{analisis.mensaje}</p>
                    </div>
                    {analisis.recomendacion && (
                      <div className="text-xs">
                        <strong className="text-warning">
                          💡 Recomendación:
                        </strong>
                        <p className="mt-1 leading-relaxed">
                          {analisis.recomendacion}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Estado */}
              <div className="mt-3 text-center">
                <span
                  className={`badge ${getBadgeClass(
                    analisis.tipo
                  )} badge-sm gap-1`}
                >
                  {analisis.tipo === "danger"
                    ? "🔴 Crítico"
                    : analisis.tipo === "warning"
                    ? "⚠️ Atención"
                    : analisis.tipo === "success"
                    ? "✅ Excelente"
                    : analisis.tipo === "info"
                    ? "ℹ️ Sin Información"
                    : "ℹ️ Sin Información"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen general */}
      <div className="card bg-base-200/50 shadow-md">
        <div className="card-body p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="stat-figure text-error">
              <span className="text-lg font-bold">
                {analisisMensual.filter((a) => a.tipo === "danger").length}
              </span>
              <span className="text-xs ml-1">Críticos</span>
            </div>
            <div className="stat-figure text-warning">
              <span className="text-lg font-bold">
                {analisisMensual.filter((a) => a.tipo === "warning").length}
              </span>
              <span className="text-xs ml-1">Advertencias</span>
            </div>
            <div className="stat-figure text-success">
              <span className="text-lg font-bold">
                {analisisMensual.filter((a) => a.tipo === "success").length}
              </span>
              <span className="text-xs ml-1">Estables</span>
            </div>
            <div className="stat-figure text-info">
              <span className="text-lg font-bold">
                {analisisMensual.filter((a) => a.tipo === "info").length}
              </span>
              <span className="text-xs ml-1">Sin Información</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
