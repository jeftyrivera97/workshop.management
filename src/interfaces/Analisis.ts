

export interface AnalisisMensual {
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