import { AnalisisMensual } from "../../../../interfaces";
import { AnalisisCardGrid } from "./AnalisisCardGrid";
import { AnalisisHeader } from "./AnalisisHeader";

interface AnalisisFinancieroProps {
  analisisMensual: AnalisisMensual[];
  selectedMonthName: string;
  descripcion: string;
}

export const AnalisisFinanciero = ({
  analisisMensual,
  selectedMonthName,
  descripcion,
}: AnalisisFinancieroProps) => {
  if (!analisisMensual?.length) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnalisisHeader
        analisisMensual={analisisMensual}
        selectedMonthName={selectedMonthName}
        descripcion={descripcion}
      />

      {/* Cards Grid */}
      <AnalisisCardGrid analisisMensual={analisisMensual} />
    </div>
  );
};
