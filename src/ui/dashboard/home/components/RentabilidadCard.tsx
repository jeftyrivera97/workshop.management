import { FaExclamationTriangle, FaCheckCircle, FaBalanceScale } from "react-icons/fa";

interface RentabilidadCardProps {
  clasificacion: string;
  mensaje: string;
  recomendacion: string;
}

const config = {
  excelente: {
    icon: <FaCheckCircle className="text-green-500 text-2xl" />,
    badge: "bg-green-100 text-green-700 border-green-200",
    title: "text-green-700",
  },
  buena: {
    icon: <FaCheckCircle className="text-emerald-500 text-2xl" />,
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "text-emerald-700",
  },
  aceptable: {
    icon: <FaCheckCircle className="text-blue-500 text-2xl" />,
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    title: "text-blue-700",
  },
  minima: {
    icon: <FaExclamationTriangle className="text-yellow-500 text-2xl" />,
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    title: "text-yellow-700",
  },
  equilibrio: {
    icon: <FaBalanceScale className="text-gray-500 text-2xl" />,
    badge: "bg-gray-100 text-gray-700 border-gray-200",
    title: "text-gray-700",
  },
  perdidas: {
    icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
    badge: "bg-red-100 text-red-700 border-red-200",
    title: "text-red-700",
  },
};

export const RentabilidadCard = ({
  clasificacion,
  mensaje,
  recomendacion,
}: RentabilidadCardProps) => {
  // Normaliza la clasificación para buscar en config
  const key = clasificacion?.toLowerCase() as keyof typeof config;
  const style = config[key] || config["equilibrio"];

  return (
    <div className={`w-full bg-base-200/80 border border-base-300 rounded-xl shadow flex items-center gap-3 p-4 backdrop-blur-sm`}>
      <div className="flex-shrink-0">{style.icon}</div>
      <div>
        <div className={`uppercase text-xs font-bold tracking-wide mb-1 ${style.title}`}>
          <span className={`px-2 py-0.5 rounded ${style.badge} border`}>{clasificacion}</span>
        </div>
        <div className="text-sm text-base-content font-semibold">{mensaje}</div>
        <div className="text-xs text-base-content/70 mt-1">{recomendacion}</div>
      </div>
    </div>
  );

};



