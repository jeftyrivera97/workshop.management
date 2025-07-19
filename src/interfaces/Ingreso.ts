
export interface IngresoData {
  data:             IngresoTableData[];
  links:            IngresoLinks;
  meta:             IngresoMeta;
  tableHeaders:     { [key: string]: string };
  contador:         number;
  moduleName:       string;
  moduleTitle:      string;
  totalMes:         string;
  totalAnual:       string;
  dataGraficaMes:   IngresoDataGraficaMes[];
  totalMesAnterior: string;
  tiposMes:         IngresoInfoTableData[];
  categoriasMes:    IngresoInfoTableData[];
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
  categoria:   IngresoCategoria;
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
  created_at:  string;
  updated_at:  string;
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
