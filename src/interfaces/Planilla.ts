export interface PlanillaData {
  data: PlanillaTableData[];
  links: PlanillaLinks;
  meta: PlanillaMeta;
  tableHeaders: { [key: string]: string };
  contador: number;
  moduleName: string;
  moduleTitle: string;
  totalMes: string;
  totalAnual: string;
  dataGraficaMes: PlanillaDataGraficaMes[];
  totalMesYearAnterior: string;
  tiposMes: PlanillaInfoTableData[];
  categoriasMes: PlanillaInfoTableData[];
  analisisMensual: PlanillaAnalisisMensual[];
   empleadosMes: PlanillaInfoTableData[];
    puestosMes: PlanillaInfoTableData[];
    areasMes: PlanillaInfoTableData[];
  

}

export interface PlanillaAnalisisMensual {
  categoria:             string;
  tipo:                  string;
  titulo:                string;
  porcentaje:           number;
  rango_recomendado?:    string;
  limite_maximo?:        number;
  mensaje:               string;
  recomendacion:         string;
  ratio?:                string;
  operacionales?:        number;
  pasivos?:              number;
  cantidad_categorias?:  number;
  porcentaje_principal?: number;
  categoria_principal?:  string;
}

export interface PlanillaInfoTableData {
  descripcion: string;
  total: number;
  porcentaje: string;
}

export interface PlanillaTableData {
  id: number;
  fecha: Date;
  descripcion: string;
  categoria: PlanillaCategoria;
  total: number;
  estado: PlanillaEstado;
  usuario: PlanillaUsuario;
  created_at: Date;
  updated_at: Date;
}

export interface PlanillaCategoria {
  id: number;
  descripcion: string;
  id_tipo?: PlanillaCategoria[];
  id_estado: PlanillaEstado[];
  id_usuario: PlanillaUsuario[];
  created_at: Date;
  updated_at: Date;
}



export interface PlanillaEstado {
  id: number;
  descripcion: string;
}

export interface PlanillaUsuario {
  id: number;
  name: string;
  email: string;
  created_at: null;
  updated_at: null;
}

export interface PlanillaDataGraficaMes {
  descripcion: string;
  total: number;
  mes_numero: number;
}

export interface PlanillaLinks {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface PlanillaMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PlanillaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PlanillaLink {
  url: null | string;
  label: string;
  active: boolean;
}
