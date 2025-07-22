/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { getDateData } from "../../../../helpers";


interface ChartData {
  descripcion: string;
  data1: number;
  data2: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-100/95 p-3 rounded-xl shadow border border-base-300 text-xs min-w-[120px]">
        <div className="font-semibold text-base-content">{label}</div>
        <div className="mt-1">
          <span className="font-bold text-info block">
            Ingresos:{" "}
            {new Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format(payload[0].payload.data1)}
          </span>
          <span className="font-bold text-error block">
            Gastos:{" "}
            {new Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format(payload[0].payload.data2)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function BarGraphComparisonComponent({ data }: { data: ChartData[] }) {
  const { currentYear } = getDateData();

  return (
    <div className="bg-base-100 p-4 rounded-2xl shadow-xl border border-base-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-base-content mb-1">
            📊 Ingresos vs Gastos {currentYear}
          </h3>
          <p className="text-base-content/60 text-xs">
            Comparativa Mes a Mes
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="2 8" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="descripcion"
            tick={{ fontSize: 13, fill: "#64748b", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              new Intl.NumberFormat("es-HN", {
                style: "currency",
                currency: "HNL",
                notation: "compact",
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              }).format(value)
            }
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#6366f11a" }} />
          <Legend
            wrapperStyle={{ fontSize: 13, marginTop: 8 }}
            iconType="circle"
            formatter={(value) =>
              value === "data1" ? (
                <span className="text-info font-semibold">Ingresos</span>
              ) : (
                <span className="text-error font-semibold">Gastos</span>
              )
            }
          />
          <defs>
            {/* Azul para data1 */}
            <linearGradient id="data1Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />   {/* azul-600 */}
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.5} /> {/* azul-400 */}
            </linearGradient>
            {/* Rojo para data2 */}
            <linearGradient id="data2Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.9} />   {/* rojo-600 */}
              <stop offset="100%" stopColor="#f87171" stopOpacity={0.5} /> {/* rojo-400 */}
            </linearGradient>
          </defs>
          <Bar
            dataKey="data1"
            fill="url(#data1Gradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={28}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
          <Bar
            dataKey="data2"
            fill="url(#data2Gradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={28}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
