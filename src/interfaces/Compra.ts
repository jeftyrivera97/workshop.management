export interface CompraData {
  data: CompraTableData[];
  links: CompraLinks;
  meta: CompraMeta;
  tableHeaders: { [key: string]: string };
  contador: number;
  moduleName: string;
  moduleTitle: string;
  totalMes: string;
  totalAnual: string;
  dataGraficaMes: CompraDataGraficaMes[];
  totalMesYearAnterior: string;
  tiposMes: CompraInfoTableData[];
  categoriasMes: CompraInfoTableData[];
  analisisMensual: CompraAnalisisMensual[];
}

export interface CompraAnalisisMensual {
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

export interface CompraInfoTableData {
  descripcion: string;
  total: number;
  porcentaje: string;
}

export interface CompraTableData {
  id: number;
  fecha: Date;
  descripcion: string;
  categoria: CompraCategoria;
  total: number;
  estado: CompraEstado;
  usuario: CompraUsuario;
  created_at: Date;
  updated_at: Date;
}

export interface CompraCategoria {
  id: number;
  descripcion: string;
  id_tipo?: CompraCategoria[];
  id_estado: CompraEstado[];
  id_usuario: CompraUsuario[];
  created_at: Date;
  updated_at: Date;
}



export interface CompraEstado {
  id: number;
  descripcion: string;
}

export interface CompraUsuario {
  id: number;
  name: string;
  email: string;
  created_at: null;
  updated_at: null;
}

export interface CompraDataGraficaMes {
  descripcion: string;
  total: number;
  mes_numero: number;
}

export interface CompraLinks {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface CompraMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: CompraLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface CompraLink {
  url: null | string;
  label: string;
  active: boolean;
}
