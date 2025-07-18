
export interface Data {
  dataTable: DataTable[];
  links: Links;
  meta: Meta;
  tableHeaders: { [key: string]: string };
  contador: number;
  moduleName: string;
  moduleTitle: string;
  totalMes: string;
  totalAnual: string;
  dataGraficaMes: DataGraficaMes[];
  totalMesAnterior: string;
  tiposMes: categoriesData[];
  categoriasMes: categoriesData[];
}

export interface categoriesData {
  descripcion: string;
  total: number;
  porcentaje: string;
}

export interface DataTable {
  id: number;
  fecha: Date;
  descripcion: string;
  categoria: Categoria;
  total: number;
  estado: Estado;
  usuario: Usuario;
  created_at: Date;
  updated_at: Date;
}

export interface Categoria {
  id: number;
  descripcion: string;
  id_tipo?: Categoria[];
  id_estado: Estado[];
  id_usuario: Usuario[];
  created_at: string;
  updated_at: string;
}

export interface Estado {
  id: number;
  descripcion: Descripcion;
}

export enum Descripcion {
  Activo = "Activo",
}

export interface Usuario {
  id: number;
  name: Name;
  email: Email;
  created_at: null;
  updated_at: null;
}

export enum Email {
  AdminTallerhSite = "admin@tallerh.site",
  SistemaTallerhSite = "sistema@tallerh.site",
}

export enum Name {
  LedaHernandez = "Leda Hernandez",
  Sistema = "Sistema ",
}

export interface DataGraficaMes {
  descripcion: string;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
