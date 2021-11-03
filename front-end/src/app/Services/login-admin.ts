import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from 'src/app/services/base.service';
import { Autenticacao } from "src/app/Models/http-api-response";

@Injectable()
export class LoginAdminService extends BaseService {

    constructor(private http: HttpClient) { super() }

    //Microsserviços
    // loginAdmin(email: string, senha: string): Observable<Autenticacao> {
    //     return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacao}admin/login`,{email,senha}, super.ObterHeaderJson());
    // }

    // registroAdmin(email: string, senha: string): Observable<Autenticacao> {
    //     return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacao}admin/registro`,{email,senha}, super.ObterHeaderJson());
    // }

    // loginUsuario(email: string, senha: string): Observable<Autenticacao> {
    //     return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacao}usuario/login`,{email,senha}, super.ObterHeaderJson());
    // }

    // registroUsuario(email: string, senha: string): Observable<Autenticacao> {
    //     return this.http.post<Autenticacao>(`${this.UrlServiceAutenticacao}usuario/registro`,{email,senha}, super.ObterHeaderJson());
    // }


    //Monolito
    loginAdmin(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceMonolito}users/admin/login`,{email,senha}, super.ObterHeaderJson());
    }

    registroAdmin(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceMonolito}users/admin/registro`,{email,senha}, super.ObterHeaderJson());
    }

    loginUsuario(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceMonolito}users/usuario/login`,{email,senha}, super.ObterHeaderJson());
    }

    registroUsuario(email: string, senha: string): Observable<Autenticacao> {
        return this.http.post<Autenticacao>(`${this.UrlServiceMonolito}users/usuario/registro`,{email,senha}, super.ObterHeaderJson());
    }
}