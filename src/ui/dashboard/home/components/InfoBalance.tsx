

interface InfoBalanceProps {
  valor: number;
  descripcion: string;
}

export const InfoBalance = ({ valor, descripcion }: InfoBalanceProps) => {
  let iconoBalance = "⚖️";

  if (valor > 0) {
    iconoBalance = "✅";
  } else if (valor < 0) {
    iconoBalance = "🚨";
  }

  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] group">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-base-content/50 uppercase tracking-wide mb-1">
            {descripcion}
          </div>
          <div
            className={`text-2xl font-black ${
              Number(valor) < 0
                ? "text-red-600 group-hover:text-red-700"
                : "text-base-content group-hover:text-primary"
            } transition-colors`}
          >
            L. {valor.toLocaleString("es-HN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        {iconoBalance && (
          <div className="text-3xl opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110">
            {iconoBalance}
          </div>
        )}
      </div>
    </div>
  );
};
