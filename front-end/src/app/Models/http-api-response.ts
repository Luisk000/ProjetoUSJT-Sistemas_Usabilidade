export class HttpApiResponse<T>{
    public data: DadosApi<T>
}

export class DadosApi<T>{
    public totalRegistros: number
    public dados: T
}

export class Autenticacao{
    public message: string;
    public token: string;
    public dados: DadosAutenticacao;
}

export class DadosAutenticacao{
    public userId: string;
    public email: string;
}