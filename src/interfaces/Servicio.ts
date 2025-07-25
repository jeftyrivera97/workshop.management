export interface ServicioData {
  data:                 ServicioTableData[];
  links:                ServicioLinks;
  meta:                 ServicioMeta;
  tableHeaders:         { [key: string]: string };
  counter:              number;
  moduleName:           string;
  moduleTitle:          string;
  totalMes:             string;
  totalAnual:           string;
  dataGraficaMes:       ServicioDataGraficaMes[];
  totalMesYearAnterior: string;
  tiposMes:             SericioInfoTableData[];
  categoriasMes:        SericioInfoTableData[];
  analisisMensual:      string;
}

export interface SericioInfoTableData {
  descripcion: string;
  total:       number;
  porcentaje:  string;
  unidades?:   number;
}

export interface ServicioTableData {
  id:            number;
  fecha:         Date;
  descripcion:   string;
  cliente:       ServicioCliente;
  auto:          ServicioAuto;
  categoria:     ServicioDataCategoria;
  color:         string;
  placa:         string;
  total:         number;
  pagoCategoria: ServicioEstado;
  estado:        ServicioEstado;
  usuario:       ServicioUsuario;
  created_at:    Date;
  updated_at:    Date;
}

export interface ServicioAuto {
  id:         number;
  marca:      ServicioAutoCategoriaMarca;
  modelo:     string;
  year:       string;
  base:       string;
  traccion:   string;
  cilindraje: string;
  combustion: string;
  categoria:  ServicioAutoCategoriaMarca;
  estado:     ServicioEstado;
  usuario:    ServicioUsuario;
  created_at: Date;
  updated_at: Date;
}

export interface ServicioAutoCategoriaMarca {
  id:          number;
  descripcion: string;
  id_estado:   number;
  id_usuario:  number;
  created_at:  null;
  updated_at:  null;
}

export interface ServicioEstado {
  id:          number;
  descripcion: string;
}

export interface ServicioUsuario {
  id:         number;
  name:       string;
  email:      string;
  created_at: null;
  updated_at: null;
}

export interface ServicioDataCategoria {
  id:          number;
  descripcion: string;
  created_at:  null;
  updated_at:  null;
}

export interface ServicioCliente {
  id:             number;
  codigo_cliente: string;
  descripcion:    string;
  telefono:       string;
  created_at:     null;
  updated_at:     null;
}

export interface ServicioDataGraficaMes {
  descripcion: string;
  total:       number;
  mes_numero:  number;
}

export interface ServicioLinks {
  first: string;
  last:  string;
  prev:  null;
  next:  null;
}

export interface ServicioMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        ServicioLink[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface ServicioLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
