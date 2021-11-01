export class HttpApiResponse<T>{
    public data: DadosApi<T>
}

export class DadosApi<T>{
    public totalRegistros: number
    public dados: T
}