import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { HttpApiResponse } from "src/app/Models/http-api-response";
import { DadosAdmin } from "../models/vagasModel";

@Injectable()
export class AdminService extends BaseService {

    constructor(private http: HttpClient) { super() }

    //Microsservicos
    // obterPorId(id: string): Observable<HttpApiResponse<DadosAdmin>> {
    //     return this.http
    //         .get<HttpApiResponse<DadosAdmin>>(this.UrlServiceCadastroAdmin + "obterPorId/" + id, super.ObterAuthHeaderJsonAdmin())
    //         .pipe(catchError(super.serviceError));
    // }

    // atualizarAdmin(admin: DadosAdmin): Observable<HttpApiResponse<any>> {
    //     let id = admin.id;
    //     let nome = admin.nome;
    //     let email = admin.email;
    //     let empresa = admin.empresa;
    //     let cargo = admin.cargo;        
    //     return this.http.put<HttpApiResponse<any>>(`${this.UrlServiceCadastroAdmin}atualizar/${id}`,{nome,email,empresa,cargo}, super.ObterAuthHeaderJsonAdmin());
    // }


    //Monolito
    obterPorId(id: string): Observable<HttpApiResponse<DadosAdmin>> {
        return this.http
            .get<HttpApiResponse<DadosAdmin>>(this.UrlServiceMonolito + "cadastroAdmin/obterPorId/" + id, super.ObterAuthHeaderJsonAdmin())
            .pipe(catchError(super.serviceError));
    }

    atualizarAdmin(admin: DadosAdmin): Observable<HttpApiResponse<any>> {
        let id = admin.id;
        let nome = admin.nome;
        let email = admin.email;
        let empresa = admin.empresa;
        let cargo = admin.cargo;        
        return this.http.put<HttpApiResponse<any>>(`${this.UrlServiceMonolito}cadastroAdmin/atualizar/${id}`,{nome,email,empresa,cargo}, super.ObterAuthHeaderJsonAdmin());
    }
}