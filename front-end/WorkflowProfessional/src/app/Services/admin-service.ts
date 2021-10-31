import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { HttpApiResponse } from "src/app/Models/http-api-response";
import { DadosAdmin } from "../Telas/admin/models/vagasModel";

@Injectable()
export class AdminService extends BaseService {

    constructor(private http: HttpClient) { super() }    

    obterAdminPorEmail(email: string): Observable<HttpApiResponse<DadosAdmin>> {
        return this.http
            .get<HttpApiResponse<DadosAdmin>>(this.UrlServiceCadastroAdmin + "obterPorEmail/" + email, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}