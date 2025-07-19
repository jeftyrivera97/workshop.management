



export interface CompraData {
  data:             CompraTableData[];
  links:            CompraLinks;
  meta:             CompraMeta;
  tableHeaders:     { [key: string]: string };
  contador:         number;
  moduleName:       string;
  moduleTitle:      string;
  totalMes:         string;
  totalAnual:       string;
  dataGraficaMes:   CompraDataGraficaMes[];
  totalMesAnterior: string;
  tiposMes:         CompraInfoTableData[];
  categoriasMes:    CompraInfoTableData[];
}

export interface CompraInfoTableData {
  descripcion: string;
  total:       number;
  porcentaje:  string;
}

export interface CompraTableData {
  id:            number;
  codigo_compra: string;
  fecha:         Date;
  descripcion:   string;
  categoria:     CompraCategoria;
  proveedor:     CompraProveedor;
  fecha_pago:    Date;
  gravado15:     number;
  gravado18:     number;
  impuesto15:    number;
  impuesto18:    number;
  exento:        number;
  exonerado:     number;
  total:         number;
  estado:        CompraEstado;
  usuario:       CompraUsuario;
  created_at:    Date;
  updated_at:    Date;
}

export interface CompraCategoria {
  id:          number;
  descripcion: string;
  id_tipo?:    CompraCategoria[];
  id_estado:   CompraEstado[];
  id_usuario:  CompraUsuario[];
  created_at:  string;
  updated_at:  string;
}

export interface CompraEstado {
  id:          number;
  descripcion: string;
}

export interface CompraUsuario {
  id:         number;
  name:       string;
  email:      string;
  created_at: null;
  updated_at: null;
}

export interface CompraProveedor {
  id:               number;
  codigo_proveedor: string;
  descripcion:      string;
  categoria:        string;
  contacto:         string;
  telefono:         string;
  id_estado:        CompraEstado[];
  id_usuario:       CompraUsuario[];
  created_at:       Date;
  updated_at:       Date;
}

export interface CompraDataGraficaMes {
  descripcion: string;
  total:       number;
}

export interface CompraLinks {
  first: string;
  last:  string;
  prev:  null;
  next:  null;
}

export interface CompraMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        CompraLink[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface CompraLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
