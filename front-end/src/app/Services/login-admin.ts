import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { Autenticacao, HttpApiResponse } from "src/app/Models/http-api-response";
import { DadosUsuario } from "../Telas/usuario/models/vagasUsuario";

@Injectable()
export class LoginAdminService extends BaseService {

    constructor(private http: HttpClient) { super() }

    //Monolito
    loginAdmin(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacaoAdminMonolito}admin/login`,{email,senha}, super.ObterHeaderJson());
    }

    registroAdmin(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacaoAdminMonolito}admin/registro`,{email,senha}, super.ObterHeaderJson());
    }
}