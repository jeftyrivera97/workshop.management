
import { InfoTableData } from "../../../interfaces";

interface DataTableProps {
  titulo: string;
  data: InfoTableData[];
}

export const DataTable = ({ titulo, data }: DataTableProps) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ml-4 mr-4 mb-2 shadow-sm">
      {/* Header  */}
      <div className="p-4 border-b border-base-content/10 bg-base-200/30">
        <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
          📊 {titulo}
        </h3>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200/50 text-base-content">
            <th className="font-semibold">Descripción</th>
            <th className="font-semibold text-center">Porcentaje</th>
            <th className="font-semibold text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((element, index) => (
              <tr
                key={`${element.descripcion}-${index}`} // Usar descripcion + index como key
                className="hover:bg-base-200/30 transition-colors duration-200"
              >
                <td className="font-medium">{element.descripcion}</td>
                <td className="text-center">
                  <span className="badge badge-neutral">
                    {element.porcentaje}% {/* Ya es string, no necesita conversión */}
                  </span>
                </td>
                <td className="text-right font-bold text-primary">
                  {new Intl.NumberFormat("es-HN", {
                    style: "currency",
                    currency: "HNL",
                  }).format(element.total)} {/* Ya es number */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
