export interface Categoria {
  id: string;
  descripcion: string;
}

export interface Ingreso {
  id: string;
  fecha: string;
  descripcion: string;
  categoria: Categoria | Categoria[];
  total: string;
}
