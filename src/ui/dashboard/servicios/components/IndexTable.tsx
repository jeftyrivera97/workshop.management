import { useGastoStore } from "../../../../hooks";
import { GastoTableData } from "../../../../interfaces/Gasto";
import { getDateData } from "../../../../helpers";

interface IndexTableProps {
  selectedMonth: string; // Agregar prop para el mes seleccionado
}

export const IndexTable = ({ selectedMonth }: IndexTableProps) => {
  const { nextPageLoading, tableData, pagination, loading, tableHeaders } =
    useGastoStore();

  //  Pasar el mes seleccionado en la paginación
  const handlePageChange = (page: number) => {
    nextPageLoading(page, "gasto", selectedMonth); // Agregar filtro
  };

  const { formatDate } = getDateData();

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ml-4 mr-4 mb-2">
      <div className="p-4 border-b border-base-content/10">
        <h3 className="text-lg font-semibold text-base-content">
          📊 Registros del Mes
        </h3>
      </div>
      <table className="table table-zebra table-pin-rows">
        {/* header  */}
        <thead>
          <tr className="bg-base-200/50 text-base-content">
            {tableHeaders &&
              Object.values(tableHeaders).map((header, id) => (
                <th key={id} className="font-semibold">
                  {String(header)}
                </th>
              ))}
          </tr>
        </thead>
        {/* Body  */}
        <tbody>
          {tableData && tableData.length > 0 ? (
            tableData.map((element: GastoTableData) => (
              <tr
                key={element.id}
                className="hover:bg-base-200/30 transition-colors duration-200"
              >
                <th className="font-mono text-primary">#{element.id}</th>
                <td className="font-medium">{formatDate(element.fecha)}</td>
                <td className="max-w-xs truncate">{element.descripcion}</td>
                <td className="max-w-xs truncate">
                  {element.categoria.descripcion}
                </td>
                <td className="font-bold text-primary">
                  {new Intl.NumberFormat("es-HN", {
                    style: "currency",
                    currency: "HNL",
                  }).format(Number(element.total) || 0)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                {loading ? "Cargando..." : "No hay datos disponibles"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {pagination && pagination.meta && (
        <div className="flex justify-center mt-4">
          <div className="join">
            {/* Botón Anterior */}
            <button
              className="join-item btn"
              onClick={() => handlePageChange(pagination.meta!.current_page - 1)}
              disabled={pagination.meta!.current_page === 1 || loading}
            >
              «
            </button>
            {/* Página actual */}
            <button className="join-item btn btn-active" disabled>
              Página {pagination.meta!.current_page}
            </button>
            {/* Botón Siguiente */}
            <button
              className="join-item btn"
              onClick={() => handlePageChange(pagination.meta!.current_page + 1)}
              disabled={
                pagination.meta!.current_page === pagination.meta!.last_page ||
                loading
              }
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
