interface InfoInputProps {
  valor: string | number;
  descripcion: string;
  icon?: string;
}

export const InfoInput = ({ valor, descripcion, icon }: InfoInputProps) => {
  return (
    <div className="mt-2 bg-base-100 p-4 rounded-xl border border-base-content/10 hover:border-base-content/20 transition-all duration-200 hover:shadow-lg group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-base-content/60 text-sm font-medium mb-2">
            {descripcion}
          </p>
          <p className="text-base-content text-xl font-bold group-hover:text-primary transition-colors">
            {valor}
          </p>
        </div>
        {icon && (
          <div className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};