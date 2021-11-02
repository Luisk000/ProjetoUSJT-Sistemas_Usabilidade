import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { VagasUsuario } from "../models/vagasUsuario";
import { HttpApiResponse } from "src/app/Models/http-api-response";

@Injectable()
export class VagasUsuarioService extends BaseService {

    constructor(private http: HttpClient) { super() }

    //Microsservicos
    // obterTodas(): Observable<HttpApiResponse<VagasUsuario[]>> {
    //     return this.http
    //         .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterTodas", super.ObterHeaderJson())
    //         .pipe(catchError(super.serviceError));
    // }

    // obterVagasTop20(): Observable<HttpApiResponse<VagasUsuario[]>> {
    //     return this.http
    //         .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterTop20", super.ObterHeaderJson())
    //         .pipe(catchError(super.serviceError));
    // }

    // obterAreasMais(): Observable<HttpApiResponse<VagasUsuario[]>> {
    //     return this.http
    //         .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterAreaMais", super.ObterHeaderJson())
    //         .pipe(catchError(super.serviceError));
    // }

    // obterVagasPorNome(filtro: string): Observable<HttpApiResponse<VagasUsuario[]>> {        
    //     return this.http.post<HttpApiResponse<VagasUsuario[]>>(`${this.UrlServiceVagasUsuario}obterFiltroNome`,{filtro}, super.ObterHeaderJson());
    // }

    // obterVagasPorDescricao(filtro: string): Observable<HttpApiResponse<VagasUsuario[]>> {        
    //     return this.http.post<HttpApiResponse<VagasUsuario[]>>(`${this.UrlServiceVagasUsuario}obterFiltroDescricao`,{filtro}, super.ObterHeaderJson());
    // }

    // obterPorId(id: string): Observable<HttpApiResponse<VagasUsuario>> {
    //     return this.http
    //         .get<HttpApiResponse<VagasUsuario>>(this.UrlServiceVagasUsuario + "obterPorId/" + id, super.ObterHeaderJson())
    //         .pipe(catchError(super.serviceError));
    // }

    // obterPorUsuarioId(idUsuario: string): Observable<HttpApiResponse<VagasUsuario[]>> {
    //     let id_usuario = idUsuario;
    //     return this.http
    //         .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterPorUsuarioId/" + id_usuario, super.ObterHeaderJson())
    //         .pipe(catchError(super.serviceError));
    // }

    // obterCandidatoInscrito(idVaga: string, idUsuario: string): Observable<boolean> {
    //     let id_vaga = idVaga; 
    //     let id_usuario = idUsuario;        
    //     return this.http.post<boolean>(`${this.UrlServiceVagasUsuario}obterCandidatoInscrito`,{id_vaga,id_usuario}, super.ObterHeaderJson());
    // }

    // candidatarVaga(idVaga: string, idUsuario: string): Observable<HttpApiResponse<any>> {
    //     let id_vaga = idVaga; 
    //     let id_usuario = idUsuario;        
    //     return this.http.post<HttpApiResponse<any>>(`${this.UrlServiceVagasUsuario}candidatar`,{id_vaga,id_usuario}, super.ObterHeaderJson());
    // }

    //Monolito
    obterTodas(): Observable<HttpApiResponse<VagasUsuario[]>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuarioMonolito + "obterTodas", super.ObterAuthHeaderJsonUsuario())
            .pipe(catchError(super.serviceError));
    }

    obterVagasTop20(): Observable<HttpApiResponse<VagasUsuario[]>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuarioMonolito + "obterTop20", super.ObterAuthHeaderJsonUsuario())
            .pipe(catchError(super.serviceError));
    }

    obterAreasMais(): Observable<HttpApiResponse<VagasUsuario[]>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuarioMonolito + "obterAreaMais", super.ObterAuthHeaderJsonUsuario())
            .pipe(catchError(super.serviceError));
    }

    obterVagasPorNome(filtro: string): Observable<HttpApiResponse<VagasUsuario[]>> {        
        return this.http.post<HttpApiResponse<VagasUsuario[]>>(`${this.UrlServiceVagasUsuarioMonolito}obterFiltroNome`,{filtro}, super.ObterAuthHeaderJsonUsuario());
    }

    obterVagasPorDescricao(filtro: string): Observable<HttpApiResponse<VagasUsuario[]>> {        
        return this.http.post<HttpApiResponse<VagasUsuario[]>>(`${this.UrlServiceVagasUsuarioMonolito}obterFiltroDescricao`,{filtro}, super.ObterAuthHeaderJsonUsuario());
    }

    obterPorId(id: string): Observable<HttpApiResponse<VagasUsuario>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario>>(this.UrlServiceVagasUsuarioMonolito + "obterPorId/" + id, super.ObterAuthHeaderJsonUsuario())
            .pipe(catchError(super.serviceError));
    }

    obterPorUsuarioId(idUsuario: string): Observable<HttpApiResponse<VagasUsuario[]>> {
        let id_usuario = idUsuario;
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuarioMonolito + "obterPorUsuarioId/" + id_usuario, super.ObterAuthHeaderJsonUsuario())
            .pipe(catchError(super.serviceError));
    }

    obterCandidatoInscrito(idVaga: string, idUsuario: string): Observable<boolean> {
        let id_vaga = idVaga; 
        let id_usuario = idUsuario;        
        return this.http.post<boolean>(`${this.UrlServiceVagasUsuarioMonolito}obterCandidatoInscrito`,{id_vaga,id_usuario}, super.ObterAuthHeaderJsonUsuario());
    }

    candidatarVaga(idVaga: string, idUsuario: string): Observable<HttpApiResponse<any>> {
        let id_vaga = idVaga; 
        let id_usuario = idUsuario;        
        return this.http.post<HttpApiResponse<any>>(`${this.UrlServiceVagasUsuarioMonolito}candidatar`,{id_vaga,id_usuario}, super.ObterAuthHeaderJsonUsuario());
    }
}
