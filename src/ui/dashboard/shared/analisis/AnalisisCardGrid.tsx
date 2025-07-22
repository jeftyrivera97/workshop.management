import { getEmoji, getStatusColor } from "../../../../helpers";
import { AnalisisMensual } from "../../../../interfaces";

interface AnalisisFinancieroProps {
  analisisMensual: AnalisisMensual[];
}

export const AnalisisCardGrid = ({ analisisMensual }: AnalisisFinancieroProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {analisisMensual.map((item, index) => (
        <div
          key={index}
          className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${getStatusColor(
            item.tipo
          )}`}
        >
          <div className="card-body p-3 sm:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xl sm:text-2xl">{getEmoji(item.categoria)}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xs sm:text-sm capitalize truncate">
                    {item.categoria?.replace("_", " ")}
                  </h3>
                  <p className="text-xs opacity-70 truncate">{item.titulo}</p>
                </div>
              </div>
              <div className={`text-lg sm:text-xl font-bold ${getStatusColor(item.tipo)} shrink-0`}>
                {item.porcentaje}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="h-1.5 sm:h-2 bg-base-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.tipo === "danger"
                      ? "bg-error"
                      : item.tipo === "warning"
                      ? "bg-warning"
                      : item.tipo === "success"
                      ? "bg-success"
                      : "bg-info"
                  }`}
                  style={{ width: `${Math.min(item.porcentaje, 100)}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <details className="group">
              <summary className="cursor-pointer text-xs font-medium py-1 px-2 bg-base-200/50 rounded-md hover:bg-base-200 transition-colors list-none flex items-center justify-between">
                <span>💬 Ver detalles</span>
                <span className="transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="mt-2 p-2 bg-base-100/50 rounded-md text-xs space-y-2">
                <div>
                  <span className="font-medium text-info">🔍 Situación:</span>
                  <p className="mt-1 leading-relaxed">{item.mensaje}</p>
                </div>
                {item.recomendacion && (
                  <div>
                    <span className="font-medium text-warning">💡 Acción:</span>
                    <p className="mt-1 leading-relaxed">{item.recomendacion}</p>
                  </div>
                )}
              </div>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
};
