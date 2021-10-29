import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { DadosUsuario, VagasUsuario } from "../models/vagasUsuario";
import { HttpApiResponse } from "src/app/Models/http-api-response";

@Injectable()
export class VagasUsuarioService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodas(): Observable<HttpApiResponse<VagasUsuario[]>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterTodas", super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterVagasTop20(): Observable<HttpApiResponse<VagasUsuario[]>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterTop20", super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterAreasMais(): Observable<HttpApiResponse<VagasUsuario[]>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterAreaMais", super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterVagasPorNome(filtro: string): Observable<HttpApiResponse<VagasUsuario[]>> {        
        return this.http.post<HttpApiResponse<VagasUsuario[]>>(`${this.UrlServiceVagasUsuario}obterFiltroNome`,{filtro}, super.ObterHeaderJson());
    }

    obterVagasPorDescricao(filtro: string): Observable<HttpApiResponse<VagasUsuario[]>> {        
        return this.http.post<HttpApiResponse<VagasUsuario[]>>(`${this.UrlServiceVagasUsuario}obterFiltroDescricao`,{filtro}, super.ObterHeaderJson());
    }

    obterPorId(id: string): Observable<HttpApiResponse<VagasUsuario>> {
        return this.http
            .get<HttpApiResponse<VagasUsuario>>(this.UrlServiceVagasUsuario + "obterPorId/" + id, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorUsuarioId(idUsuario: string): Observable<HttpApiResponse<VagasUsuario[]>> {
        let id_usuario = idUsuario;
        return this.http
            .get<HttpApiResponse<VagasUsuario[]>>(this.UrlServiceVagasUsuario + "obterPorUsuarioId/" + id_usuario, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterCandidatoInscrito(idVaga: string, idUsuario: string): Observable<boolean> {
        let id_vaga = idVaga; 
        let id_usuario = idUsuario;        
        return this.http.post<boolean>(`${this.UrlServiceVagasUsuario}obterCandidatoInscrito`,{id_vaga,id_usuario}, super.ObterHeaderJson());
    }

    candidatarVaga(idVaga: string, idUsuario: string): Observable<HttpApiResponse<any>> {
        let id_vaga = idVaga; 
        let id_usuario = idUsuario;        
        return this.http.post<HttpApiResponse<any>>(`${this.UrlServiceVagasUsuario}candidatar`,{id_vaga,id_usuario}, super.ObterHeaderJson());
    }


    // novoProduto(produto: Produto): Observable<Produto> {
    //     return this.http
    //         .post(this.UrlServiceV1 + "produtos", produto, super.ObterAuthHeaderJson())
    //         .pipe(
    //             map(super.extractData),
    //             catchError(super.serviceError));
    // }

    // atualizarProduto(produto: Produto): Observable<Produto> {
    //     return this.http
    //         .put(this.UrlServiceV1 + "produtos/" + produto.id, produto, super.ObterAuthHeaderJson())
    //         .pipe(
    //             map(super.extractData),
    //             catchError(super.serviceError));
    // }

    // excluirProduto(id: string): Observable<Produto> {
    //     return this.http
    //         .delete(this.UrlServiceV1 + "produtos/" + id, super.ObterAuthHeaderJson())
    //         .pipe(
    //             map(super.extractData),
    //             catchError(super.serviceError));
    // }

    // obterFornecedores(): Observable<Fornecedor[]> {
    //     return this.http
    //         .get<Fornecedor[]>(this.UrlServiceV1 + "fornecedores")
    //         .pipe(catchError(super.serviceError));
    // }
}
