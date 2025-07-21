export interface GastoData {
  data: GastoTableData[];
  links: GastoLinks;
  meta: GastoMeta;
  tableHeaders: { [key: string]: string };
  contador: number;
  moduleName: string;
  moduleTitle: string;
  totalMes: string;
  totalAnual: string;
  dataGraficaMes: GastoDataGraficaMes[];
  totalMesYearAnterior: string;
  tiposMes: GastoInfoTableData[];
  categoriasMes: GastoInfoTableData[];
  analisisMensual: GastoAnalisisMensual[];
}

export interface GastoAnalisisMensual {
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

export interface GastoInfoTableData {
  descripcion: string;
  total: number;
  porcentaje: string;
}

export interface GastoTableData {
  id: number;
  fecha: Date;
  descripcion: string;
  categoria: GastoCategoria;
  total: number;
  estado: GastoEstado;
  usuario: GastoUsuario;
  created_at: Date;
  updated_at: Date;
}

export interface GastoCategoria {
  id: number;
  descripcion: string;
  id_tipo?: GastoCategoria[];
  id_estado: GastoEstado[];
  id_usuario: GastoUsuario[];
  created_at: Date;
  updated_at: Date;
}



export interface GastoEstado {
  id: number;
  descripcion: string;
}

export interface GastoUsuario {
  id: number;
  name: string;
  email: string;
  created_at: null;
  updated_at: null;
}

export interface GastoDataGraficaMes {
  descripcion: string;
  total: number;
  mes_numero: number;
}

export interface GastoLinks {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface GastoMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: GastoLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface GastoLink {
  url: null | string;
  label: string;
  active: boolean;
}
