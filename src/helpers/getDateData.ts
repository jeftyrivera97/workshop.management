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

  const getCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`; // Formato: 2025-07
  };

  const getMonthName = (yearMonth: string): string => {
    if (!yearMonth) return "";

    const [year, month] = yearMonth.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);

    // Formatear en español
    return date.toLocaleDateString("es-ES", {
      month: "long",
      year: "numeric",
    });
  };

  return {
    currentYear,
    currentMonth,
    previousMonth,
    currentDate,

    //Metodos adicionales
    formatDate,
    getCurrentMonth,
    getMonthName,
  };
};

// Exportaciones adicionales útiles
export const formatMonth = (date: Date) => {
  return date.toLocaleDateString("es-ES", { month: "long" });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("es-ES");
};
