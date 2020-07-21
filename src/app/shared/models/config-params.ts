export interface ConfigParams {
    pagina?: number;
    limite?: number;
    pesquisa?: string;
    campo?: CampoGenerico;
}

export interface CampoGenerico {
    tipo: string;
    valor: any;
}
