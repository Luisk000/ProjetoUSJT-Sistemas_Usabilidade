import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { HttpApiResponse } from "src/app/Models/http-api-response";
import { DadosUsuario } from "../Telas/usuario/models/vagasUsuario";
import { LoginRegistro } from "../Telas/login-inicio/Model-Login/loginRegistro";

@Injectable()
export class UsuarioService extends BaseService {

    constructor(private http: HttpClient) { super() }    

    obterUsuarioPorEmail(email: string): Observable<HttpApiResponse<DadosUsuario>> {
        return this.http
            .get<HttpApiResponse<DadosUsuario>>(this.UrlServiceCadastroUsuario + "obterPorEmail/" + email, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    cadastrarUsuario(email: string): Observable<HttpApiResponse<any>> {
        return this.http.post<HttpApiResponse<any>>(`${this.UrlServiceCadastroUsuario}cadastrar`,{email}, super.ObterHeaderJson());
    }
}