export interface Ss {
    data:                 Datum[];
    links:                Links;
    meta:                 Meta;
    tableHeaders:         { [key: string]: string };
    counter:              number;
    moduleName:           string;
    moduleTitle:          string;
    totalMes:             string;
    totalAnual:           string;
    dataGraficaMes:       DataGraficaMe[];
    totalMesYearAnterior: string;
    tiposMes:             SMe[];
    categoriasMes:        SMe[];
    analisisMensual:      string;
}

export interface SMe {
    descripcion: string;
    total:       number;
    porcentaje:  string;
}

export interface Datum {
    id:                number;
    fecha:             Date;
    descripcion:       string;
    cliente:           Cliente;
    auto:              Auto;
    categoria:         Categoria;
    color:             string;
    placa:             string;
    total:             number;
    id_pago_categoria: number;
    estado:            Estado;
    usuario:           Usuario;
    created_at:        Date;
    updated_at:        Date;
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

export interface Categoria {
    id:          number;
    descripcion: string;
    created_at:  null;
    updated_at:  null;
}

export interface Cliente {
    id:             number;
    codigo_cliente: string;
    descripcion:    string;
    telefono:       string;
    created_at:     null;
    updated_at:     null;
}

export interface Estado {
    id:          number;
    descripcion: string;
}

export interface Usuario {
    id:         number;
    name:       string;
    email:      string;
    created_at: null;
    updated_at: null;
}

export interface DataGraficaMe {
    descripcion: string;
    total:       number;
    mes_numero:  number;
}

export interface Links {
    first: string;
    last:  string;
    prev:  null;
    next:  null;
}

export interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        Link[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
