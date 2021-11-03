import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { HttpApiResponse } from "src/app/Models/http-api-response";
import { DadosUsuario } from "../models/vagasUsuario";

@Injectable()
export class UsuarioService extends BaseService {

    constructor(private http: HttpClient) { super() }    

    //Microsservicos
    // obterPorId(id: string): Observable<HttpApiResponse<DadosUsuario>> {
    //     return this.http
    //         .get<HttpApiResponse<DadosUsuario>>(this.UrlServiceCadastroUsuario + "obterPorId/" + id, super.ObterAuthHeaderJsonUsuario())
    //         .pipe(catchError(super.serviceError));
    // }

    // atualizarUsuario(usuario: DadosUsuario): Observable<HttpApiResponse<any>> {
    //     let id = usuario.id;
    //     let nome = usuario.nome;
    //     let email = usuario.email;
    //     let data_nascimento = usuario.dataNascimento;
    //     let profissao = usuario.profissao;
    //     let experiencia = usuario.experiencia;
    //     let cursos = usuario.cursos;
    //     return this.http.put<HttpApiResponse<any>>(`${this.UrlServiceCadastroUsuario}atualizar/${id}`,{usuario,nome,email,data_nascimento,profissao,experiencia,cursos}, super.ObterAuthHeaderJsonUsuario());
    // }

    //Monolito
    obterPorId(id: string): Observable<HttpApiResponse<DadosUsuario>> {
        return this.http
            .get<HttpApiResponse<DadosUsuario>>(this.UrlServiceMonolito + "cadastroUsuario/obterPorId/" + id, super.ObterAuthHeaderJsonUsuario())
            .pipe(catchError(super.serviceError));
    }

    atualizarUsuario(usuario: DadosUsuario): Observable<HttpApiResponse<any>> {
        let id = usuario.id;
        let nome = usuario.nome;
        let email = usuario.email;
        let data_nascimento = usuario.dataNascimento;
        let profissao = usuario.profissao;
        let experiencia = usuario.experiencia;
        let cursos = usuario.cursos;
        return this.http.put<HttpApiResponse<any>>(`${this.UrlServiceMonolito}cadastroUsuario/atualizar/${id}`,{usuario,nome,email,data_nascimento,profissao,experiencia,cursos}, super.ObterAuthHeaderJsonUsuario());
    }
}