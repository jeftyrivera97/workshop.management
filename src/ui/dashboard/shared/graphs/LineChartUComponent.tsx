/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { getDateData } from "../../../../helpers";

interface ChartData {
  descripcion: string;
  total: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-300 p-4 border border-accent/50 rounded-box shadow-2xl backdrop-blur-sm">
        <p className="font-semibold text-gray-200 mb-2 text-sm">{label}</p>
        <p className="text-accent font-bold text-lg">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function LineChartComponent({ data }: { data: ChartData[] }) {
  const { currentYear } = getDateData();

  // Estados para colores adaptados al theme
  const [colors, setColors] = useState({
    stroke: "hsl(var(--a))",
    gradientStart: 0.7,
    gradientEnd: 0.05,
    axis: "#222",
    gridStroke: "rgba(156, 163, 175, 0.2)",
    dotFill: "#f3f4f6",
    dotStroke: "hsl(var(--a))",
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const applyColors = () => {
      if (mq.matches) {
        // **Light mode**: usamos tonos más oscuros y opacidades mayores
        setColors({
          stroke: "#2563EB", // blue-600
          gradientStart: 0.5, // más visible
          gradientEnd: 0.1,
          axis: "#374151", // gray-700
          gridStroke: "rgba(107, 114, 128, 0.3)", // gray-500 a 0.3
          dotFill: "#FFFFFF",
          dotStroke: "#2563EB",
        });
      } else {
        // **Dark mode**: volvemos a tus valores originales
        setColors({
          stroke: "#524E4D", // gray-600
          gradientStart: 0.7,
          gradientEnd: 0.05,
          axis: "#DDD",
          gridStroke: "rgba(156, 163, 175, 0.2)",
          dotFill: "#f3f4f6",
          dotStroke: "hsl(var(--a))",
        });
      }
    };
    mq.addEventListener("change", applyColors);
    applyColors();
    return () => {
      mq.removeEventListener("change", applyColors);
    };
  }, []);

  return (
    <div
      className="bg-base-100 p-6 rounded-box shadow-2xl border border-gray-600/20 transition-all duration-300"
      style={{ background: "var(--chart-bg)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-200 mb-1">
            📉 Gráfica Mensual
          </h3>
          <p className="text-gray-400 text-sm">Tendencia mensual</p>
        </div>
        <div className="flex gap-2">
          <div className="badge badge-primary text-gray-100 font-semibold">
            Actualizado
          </div>
          <div className="badge badge-secondary text-gray-100 font-semibold">
            {currentYear}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="accentGlow" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={colors.stroke}
                stopOpacity={colors.gradientStart}
              />
              <stop
                offset="100%"
                stopColor={colors.stroke}
                stopOpacity={colors.gradientEnd}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="2 4"
            stroke={colors.gridStroke}
            vertical={false}
          />

          <XAxis
            dataKey="descripcion"
            tick={{
              fontSize: 12,
              fill: colors.axis,
              fontWeight: "400",
            }}
            axisLine={{ stroke: colors.axis }}
            tickLine={{ stroke: colors.axis }}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: colors.axis,
              fontWeight: "400",
            }}
            axisLine={{ stroke: colors.axis }}
            tickLine={{ stroke: colors.axis }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              color: colors.axis,
              fontSize: "13px",
              fontWeight: "400",
            }}
          />

          <Area
            type="monotone"
            dataKey="total"
            stroke={colors.stroke}
            strokeWidth={3}
            fill="url(#accentGlow)"
            dot={{
              fill: colors.dotFill,
              strokeWidth: 2,
              r: 5,
              stroke: colors.dotStroke,
            }}
            activeDot={{
              r: 7,
              stroke: colors.dotStroke,
              strokeWidth: 3,
              fill: colors.dotFill,
              filter: `drop-shadow(0 0 8px ${colors.stroke})`,
            }}
            name="💎 Ingresos Totales"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
