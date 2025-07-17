import '../../css/ui.css'

export const ModuleTab = ({ moduleName }: { moduleName: string }) => {
  return (
    <div className="flex items-center gap-3 mb-6 px-4">
      <div className="badge badge-primary badge-sm"></div>
      <h2 className="text-base font-medium text-base-content tracking-wide">
        {moduleName.toUpperCase()}
      </h2>
      <div className="flex-1 h-px bg-base-content/20"></div>
    </div>
  );
};
