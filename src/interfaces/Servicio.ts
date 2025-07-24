export interface ServicioData {
  data: ServicioTableData[];
  links: ServicioLinks;
  meta: ServicioMeta;
  tableHeaders: { [key: string]: string };
  contador: number;
  moduleName: string;
  moduleTitle: string;
  totalMes: string;
  totalAnual: string;
  dataGraficaMes: ServicioDataGraficaMes[];
  totalMesYearAnterior: string;
  tiposMes: ServicioInfoTableData[];
  categoriasMes: ServicioInfoTableData[];
  analisisMensual: string;
}

export interface ServicioInfoTableData {
  descripcion: string;
  total: number;
  porcentaje: string;
}

export interface ServicioTableData {
  id: number;
  fecha: Date;
  descripcion: string;
  cliente: ServicioCliente;
  auto: Auto;
  categoria: ServicioCategoria;
  color: string;
  placa: string;
  total: number;
  id_pago_categoria: number;
  estado: ServicioEstado;
  usuario: ServicioUsuario;
  created_at: Date;
  updated_at: Date;
}

export interface ServicioCategoria {
  id: number;
  descripcion: string;
  created_at: null;
  updated_at: null;
}

export interface Auto {
    id:         number;
    modelo:     string;
    year:       string;
    base:       string;
    traccion:   string;
    cilindraje: string;
    combustion: string;
    created_at: Date;
    updated_at: Date;
}

export interface ServicioCliente {
  id: number;
  codigo_cliente: string;
  descripcion: string;
  telefono: string;
  created_at: null;
  updated_at: null;
}

export interface ServicioEstado {
  id: number;
  descripcion: string;
}

export interface ServicioUsuario {
  id: number;
  name: string;
  email: string;
  created_at: null;
  updated_at: null;
}

export interface ServicioDataGraficaMes {
  descripcion: string;
  total: number;
  mes_numero: number;
}

export interface ServicioLinks {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface ServicioMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: ServicioLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ServicioLink {
  url: null | string;
  label: string;
  active: boolean;
}
