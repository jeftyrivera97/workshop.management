/* eslint-disable @typescript-eslint/no-explicit-any */
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
         {payload[0].value} Unidades
        </p>
      </div>
    );
  }
  return null;
};

export default function LineChartUComponent({ data }: { data: ChartData[] }) {
  const { currentYear } = getDateData();

  return (
    <div className="bg-base-100 p-6 rounded-box shadow-2xl border border-gray-600/20 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-200 mb-1">
            📉 Grafica Mensual
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
              <stop offset="0%" stopColor="hsl(var(--a))" stopOpacity={0.7} />
              <stop
                offset="100%"
                stopColor="hsl(var(--a))"
                stopOpacity={0.05}
              />
            </linearGradient>
            <linearGradient id="secondaryGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--s))" stopOpacity={0.5} />
              <stop
                offset="100%"
                stopColor="hsl(var(--s))"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="rgba(156, 163, 175, 0.2)"
            vertical={false}
          />
          <XAxis
            dataKey="descripcion"
            tick={{ fontSize: 12, fill: "#d1d5db", fontWeight: "400" }}
            axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
            tickLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#d1d5db", fontWeight: "400" }}
            axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
            tickLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
            tickFormatter={(value) =>
             value
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              color: "#d1d5db",
              fontSize: "13px",
              fontWeight: "400",
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="hsl(var(--a))"
            strokeWidth={3}
            fill="url(#accentGlow)"
            dot={{
              fill: "#f3f4f6",
              strokeWidth: 2,
              r: 5,
              stroke: "hsl(var(--a))",
            }}
            activeDot={{
              r: 7,
              stroke: "hsl(var(--a))",
              strokeWidth: 3,
              fill: "#f9fafb",
              filter: "drop-shadow(0 0 8px hsl(var(--a)))",
            }}
            name="💎 Ingresos Totales"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
