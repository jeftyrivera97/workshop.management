/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useIngresoStore } from "../../../hooks";

interface Data {
  id?: number;
  descripcion: string;
  porcentaje: string;
  total: string;
}

interface DataTableProps {
  data: Data[];
  titulo: string;
}

export const DataTable = ({ data, titulo }: DataTableProps) => {
  const { startLoading } = useIngresoStore();

  useEffect(() => {
    startLoading(1, "ingreso");
  }, []);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ml-4 mr-4 mb-2 shadow-sm">
      {/* Header con icono */}
      <div className="p-4 border-b border-base-content/10 bg-base-200/30">
        <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
          📊 {titulo}
        </h3>
      </div>

      {/* Tabla mejorada */}
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200/50 text-base-content">
            <th className="font-semibold">Descripción</th>
            <th className="font-semibold text-center">Porcentaje</th>
            <th className="font-semibold text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr
              key={element.id || index}
              className="hover:bg-base-200/30 transition-colors duration-200"
            >
              <td className="font-medium">{element.descripcion}</td>
              <td className="text-center">
                <span>
                  {element.porcentaje}%
                </span>
              </td>
              <td className="text-right font-bold text-primary">
                {new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(Number(element.total) || 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
