interface InfoInputProps {
  valor: string | number;
  descripcion: string;
  icon?: string;
}

export const InfoInput = ({ valor, descripcion, icon }: InfoInputProps) => {
  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] group">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-base-content/50 uppercase tracking-wide mb-1">
            {descripcion}
          </div>
          <div className="text-2xl font-black text-base-content group-hover:text-primary transition-colors">
            {valor}
          </div>
        </div>
        {icon && (
          <div className="text-3xl opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};