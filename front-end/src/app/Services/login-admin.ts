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
        return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacaoMonolito}admin/login`,{email,senha}, super.ObterHeaderJson());
    }

    registroAdmin(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacaoMonolito}admin/registro`,{email,senha}, super.ObterHeaderJson());
    }

    loginUsuario(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacaoMonolito}usuario/login`,{email,senha}, super.ObterHeaderJson());
    }

    registroUsuario(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacaoMonolito}usuario/registro`,{email,senha}, super.ObterHeaderJson());
    }
}