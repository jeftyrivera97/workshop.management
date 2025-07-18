export const getDateData = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleDateString("es-ES", {
    month: "long",
  });

  // Calcular el mes anterior
  const previousMonthDate = new Date();
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  const previousMonth = previousMonthDate.toLocaleDateString("es-ES", {
    month: "long",
  });

  const currentDate = new Date().toLocaleDateString("es-ES");

  const formatDate = (fecha: string | Date): string => {
    if (!fecha) return "N/A";

    if (fecha instanceof Date) {
      return fecha.toLocaleDateString("es-HN");
    }

    if (typeof fecha === "string") {
      const date = new Date(fecha);
      return isNaN(date.getTime()) ? fecha : date.toLocaleDateString("es-HN");
    }

    return String(fecha);
  };

  return {
    currentYear,
    currentMonth,
    previousMonth,
    currentDate,

    //Metodos adicionales
    formatDate
  };
};

// Exportaciones adicionales útiles
export const formatMonth = (date: Date) => {
  return date.toLocaleDateString("es-ES", { month: "long" });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("es-ES");
};
