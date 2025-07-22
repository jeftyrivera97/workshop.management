export interface HomeData {
    moduleName:              string;
    moduleTitle:             string;
    totales:                 HomeTotales;
    porcentajes:             HomePorcentajes;
    balances:                HomeBalances;
    variaciones:             HomeVariaciones;
    eficiencia:              HomeEficiencia;
    rentabilidad:            HomeRentabilidad;
    dataGraficaIngresos:     HomeDataGrafica[];
    dataGraficaEgresos:      HomeDataGrafica[];
    categoriasIngresosAnual: HomeCategoriasAnual[];
    categoriasComprasAnual:  HomeCategoriasAnual[];
    categoriasGastosAnual:   HomeCategoriasAnual[];
    tiposIngresosAnual:      HomeCategoriasAnual[];
}

export interface HomeBalances {
    balance_anual:  number;
    estado_balance: string;
    color_balance:  string;
    icono_balance:  string;
}

export interface HomeCategoriasAnual {
    descripcion: string;
    total:       number;
    porcentaje:  string;
}

export interface HomeDataGrafica {
    descripcion: string;
    total:       number;
    mes_numero:  number;
}

export interface HomeEficiencia {
    eficiencia_compras: string;
    color_eficiencia:   string;
}

export interface HomePorcentajes {
    margen_ganancia_actual:      number;
    margen_ganancia_anterior:    number;
    porcentaje_egresos_actual:   number;
    porcentaje_egresos_anterior: number;
    porcentaje_compras:          number;
    porcentaje_gastos:           number;
}

export interface HomeRentabilidad {
    clasificacion_rentabilidad: string;
    mensaje_rentabilidad:       string;
    recomendacion_rentabilidad: string;
}

export interface HomeTotales {
    ingresosAnualActual:   number;
    comprasAnualActual:    number;
    gastosAnualActual:     number;
    balanceAnual:          number;
    ingresosAnualAnterior: number;
    comprasAnualAnterior:  number;
    gastosAnualAnterior:   number;
    balanceAnterior:       number;
    egresosAnualActual:    number;
    egresosAnualAnterior:  number;
}

export interface HomeVariaciones {
    variacion_ingresos: number;
    variacion_egresos:  number;
    variacion_balance:  number;
    variacion_margen:   number;
    tendencia_ingresos: string;
    tendencia_egresos:  string;
    tendencia_balance:  string;
    tendencia_margen:   string;
}
