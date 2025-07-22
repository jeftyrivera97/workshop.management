
 export const getEmoji = (categoria: string) => {
    const emojis = {
       // Ingresos
    pasivos: "💳",
    ingresos_operacionales: "🚗",
    balance_general: "⚖️",
    
    // Compras
    materia_prima: "🏭",
    herramientas: "🔨",
    insumos_operativos: "🔋",
    seguridad_higiene: "🦺",
    administrativos: "💼",
    eficiencia_productiva: "🚀",
    
    // Gastos
    gastos_fijos: "🏠",
    gastos_variables: "📊",
    gastos_directos: "🎯",
    gastos_indirectos: "🔄",
    gastos_extraordinarios: "⚡"


    };
    return emojis[categoria as keyof typeof emojis] || "📈";
  };

  export const getStatusColor = (tipo: string) => {
    const colors = {
      danger: "border-l-error text-error",
      warning: "border-l-warning text-warning",
      success: "border-l-success text-success",
      info: "border-l-info text-info",
    };
    return colors[tipo as keyof typeof colors] || colors.info;
  };