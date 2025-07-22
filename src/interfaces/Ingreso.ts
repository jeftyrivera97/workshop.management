export interface IngresoData {
  data:                 IngresoTableData[];
  links:                IngresoLinks;
  meta:                 IngresoMeta;
  tableHeaders:         { [key: string]: string };
  contador:             number;
  moduleName:           string;
  moduleTitle:          string;
  totalMes:             string;
  totalAnual:           string;
  dataGraficaMes:       IngresoDataGraficaMes[];
  totalMesYearAnterior: string;
  tiposMes:             IngresoInfoTableData[];
  categoriasMes:        IngresoInfoTableData[];
  analisisMensual:      IngresoAnalisisMensual[];
}

export interface IngresoAnalisisMensual {
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

export interface IngresoInfoTableData {
  descripcion: string;
  total:       number;
  porcentaje:  string;
}

export interface IngresoTableData {
  id:          number;
  fecha:       Date;
  descripcion: string;
  categoria:  IngresoCategoria;
  total:       number;
  estado:      IngresoEstado;
  usuario:     IngresoUsuario;
  created_at:  Date;
  updated_at:  Date;
}

export interface IngresoCategoria {
  id:          number;
  descripcion: string;
  id_tipo?:    IngresoCategoria[];
  id_estado:   IngresoEstado[];
  id_usuario:  IngresoUsuario[];
  created_at:  Date;
  updated_at:  Date;
}


export interface IngresoEstado {
  id:          number;
  descripcion: string;
}


export interface IngresoUsuario {
  id:         number;
  name:       string;
  email:      string;
  created_at: null;
  updated_at: null;
}

export interface IngresoDataGraficaMes {
  descripcion: string;
  total:       number;
  mes_numero:  number;
}

export interface IngresoLinks {
  first: string;
  last:  string;
  prev:  null;
  next:  string;
}

export interface IngresoMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        IngresoLink[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface IngresoLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
