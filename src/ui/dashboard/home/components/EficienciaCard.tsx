
import { FaBalanceScale, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

interface EficienciaCardProps {
  eficiencia_compras: string;
  color_eficiencia?: string;
  recomendacion: string;
}

const config = {
  compras_dominantes: {
    icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    title: "text-blue-700",
    label: "Compras dominantes",
  },
  gastos_dominantes: {
    icon: <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    title: "text-yellow-700",
    label: "Gastos dominantes",
  },
  equilibrado: {
    icon: <FaBalanceScale className="text-green-500 text-2xl" />,
    badge: "bg-green-100 text-green-700 border-green-200",
    title: "text-green-700",
    label: "Equilibrado",
  },
};

export const EficienciaCard = ({
  eficiencia_compras,
  recomendacion,
}: EficienciaCardProps) => {
  const key = eficiencia_compras?.toLowerCase() as keyof typeof config;
  const style = config[key] || config["equilibrado"];

  return (
    <div className="w-full bg-base-200/80 border border-base-300 rounded-xl shadow flex items-center gap-3 p-4 backdrop-blur-sm">
      <div className="flex-shrink-0">{style.icon}</div>
      <div>
        <div className={`uppercase text-xs font-bold tracking-wide mb-1 ${style.title}`}>
          <span className={`px-2 py-0.5 rounded ${style.badge} border`}>{style.label}</span>
        </div>
        <div className="text-xs text-base-content/70 mt-1">{recomendacion}</div>
      </div>
    </div>
  );
};
